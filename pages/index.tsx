import { FaPlay } from "react-icons/fa";
import MatchOfTheDay from "@/components/common/MatchOfTheDay";
import GenreList from "@/components/common/GenreList";
import { useEffect, useState } from "react";
import { MainMovieProps } from "@/interfaces";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [randomMovie, setRandomMovie] = useState<MainMovieProps | null>(null);

  const fetchData = async (endpoint: string, signal?: AbortSignal) => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
        },
      }
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchAll = async () => {
      setLoading(true);

      try {
        const popularResponse = await fetchData("/movie/popular", controller.signal);
        const movies = popularResponse.data.results;

        if (movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          setRandomMovie(movies[randomIndex]);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!randomMovie) {
    return <p>No movie available</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col-reverse md:flex-row w-full pt-6">
        <div className="md:w-1/2 py-10 bg-linear-to-r from-black via-black/70 to-transparent">
          <div className="flex flex-col justify-center items-center h-full w-3/4 m-auto md:gap-2 text-center">
            <div className="text-[11px] bg-[#2C2C2C] font-bold px-1 py-0.5 rounded-lg">MATCH OF THE DAY</div>
            <p className="text-[#1DB954]"><span className="text-lg">78</span>% Match</p>
            <h1 className="md:text-2xl text-[#A3A3A3]">{randomMovie.title}</h1>
            <div className="md:text-base text-sm">
              Drama<span className="text-[#2C2C2C]"> • </span>TV-MA <span className="text-[#2C2C2C]"> • </span> 2019 <span className="text-[#2C2C2C]"> • </span> 1 Season
            </div>
            <p className="text-center text-xs md:text-base">{randomMovie.overview}</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-2 pt-4">
              <button className="flex items-center md:btn btn-primary text-xs md:text-base px-4 py-1 rounded-2xl"><FaPlay size={18} className="pr-2" />Watch On Netflix</button>
              <button className="btn btn-secondary text-xs md:text-base px-4 py-1">More Info</button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-87.5 md:h-125 relative">
          <Image
            src={`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`}
            alt={randomMovie.title}
            width={500}
            height={300}
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>

      <div className="my-10">
        <MatchOfTheDay />
      </div>
      <div>
        <GenreList />
      </div>
    </div>
  );
}
