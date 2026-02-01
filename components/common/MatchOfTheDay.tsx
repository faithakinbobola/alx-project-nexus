import { MainMovieProps, MovieApiResponse } from "@/interfaces"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const MatchOfTheDay: React.FC = () => {
    const [movies, setMovies] = useState<MainMovieProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const moviesRes = await axios.get<MovieApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trending/all/day`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
                        }
                    }
                )
                const movies = moviesRes.data.results;
                setMovies(movies);
            } catch (error) {
                console.log("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])

    // const [randomMovies, setRandomMovies] = useState<MainMovieProps[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (movies.length > 0) {
    //         const shuffled = [...movies].sort(() => Math.random() - 0.5).slice(0, 10);
    //         setRandomMovies(shuffled);
    //     }
    // }, [movies]);

    if (loading) {
        return <p>Loading...</p>
    }

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    }

    return (
        <div className="mt-10 md:mt-30">
            <p className="text-base md:text-2xl mb-2 md:mb-5 text-[#A3A3A3]">Trending</p>
            <div className="relative group">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 z-10 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    <BiChevronLeft size={28} />
                </button>
                <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4 px-6">
                    {
                        movies.map(({ poster_path, title, id, name, vote_average }: MainMovieProps) => (
                            <Link href={`/movie/${id}`} key={id}>
                                <div className="shrink-0 w-62.5 group">
                                    <div className="w-full">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                                            alt={title || name || "Unknown"}
                                            width={350}
                                            height={90}
                                            className="object-cover w-full h-37.5 rounded-lg"
                                            priority
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="truncate">{title || name || "Unknown"}</div>
                                        <div>{Math.floor(vote_average/10 * 100)}%</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition"
                >
                    <BiChevronRight size={28} />
                </button>
            </div>
        </div>
    )
}

export default MatchOfTheDay;