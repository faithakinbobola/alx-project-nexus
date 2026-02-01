import { useEffect, useState } from "react";
import GenreButton from "./GenreButton";
import Link from "next/link";
import {
    GenreTypesProps,
    MainMovieProps,
} from "@/interfaces";
import axios, { AxiosError } from "axios";
import Image from "next/image";

const GenreList: React.FC = () => {
    const [movies, setMovies] = useState<MainMovieProps[]>([]);
    const [genres, setGenres] = useState<GenreTypesProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAllPages = async <T,>(endpoint: string, signal?: AbortSignal): Promise<T[]> => {
        const results: T[] = [];
        let page = 1;
        const totalPages = 5; 

        try {
            while (page <= totalPages) {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
                    params: { page },
                    signal,
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
                    },
                });

                results.push(...data.results);
                page++;
            }
        } catch (err) {
            console.error("Error fetching paginated data:", err);
        }

        console.log("Final results length:", results.length);
        return results;
    };

    
    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            try {
                const genreRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/genre/movie/list`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
                    },
                });

                setGenres(genreRes.data.genres);
            } catch (e) {
                console.error("Error fetching genres", e);
            } finally {
                setLoading(false);
            }
        };

        fetchGenre();
    }, []);

    // Fetch movies
    useEffect(() => {
        const controller = new AbortController();

        const fetchAll = async () => {
            setLoading(true);

            try {
                const allMovies = await fetchAllPages<MainMovieProps>("/movie/popular", controller.signal);
                setMovies(allMovies);
            } catch (error) {
                const err = error as AxiosError;
                if (err?.code === "ERR_CANCELED") {
                    console.log("Request canceled, not an error.");
                } else {
                    console.error("Error fetching movies:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAll();

        return () => controller.abort();
    }, []);

    // Handle genre selection
    const handleGenreClick = (genre: string) => {
        setSelectedGenre((prev) => (prev === genre ? null : genre));
    };

    // Filter movies by genre
    const filteredMovies = selectedGenre
        ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
        : movies;

    if (loading) {
        return <p>Loading genres...</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <h2 className="text-xl text-[#A3A3A3]">Popular Genres</h2>
                <button
                    onClick={() => setSelectedGenre(null)}
                    className="text-blue-500 hover:underline"
                >
                    View All
                </button>
            </div>

            <GenreButton
                genres={genres}
                selectedGenre={selectedGenre}
                buttonClick={handleGenreClick}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {filteredMovies.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                        <div className="flex flex-col gap-3 group">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={350}
                                height={150}
                                className="w-full rounded-lg hover:bg-black group-hover:opacity-60 transition"
                            />
                            <div className="text-center group-hover:opacity-50 transition">{movie.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GenreList;
