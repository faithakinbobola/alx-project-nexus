import { MainMovieProps } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBookmark, FaImdb } from "react-icons/fa";
import { FaPlus, FaRegBookmark } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { MdOutlineStarRate } from "react-icons/md";

const MovieDetail: React.FC<{ property: MainMovieProps }> = ({ property }) => {
    const tabs = [
        {
            label: "Description",
            content: (
                <div>
                    <p className="font-semibold mb-2">About the movie</p>
                    <p>{property.description} || &quot;No description yet&quot;</p>
                </div>
            )
        },
        {
            label: "Ratings",
            content: (
                <p>{property.rating ? `${property.rating}/10` : "No ratings yet."}</p>
            )
        },
    ];

    const [activeTab, setActiveTab] = useState<number>(0);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
        setIsSaved(savedMovies.includes(property.movie_id));
    }, [property.movie_id]);

    const handleSave = () => {
        let savedMovies: number[] = JSON.parse(localStorage.getItem("savedMovies") || "[]");

        if (isSaved) {
            savedMovies = savedMovies.filter((movieId) => movieId !== property.movie_id);
        } else {
            savedMovies.push(property.movie_id);
        }

        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setIsSaved(!isSaved)
    }

    return (
        <div className="">
            <div className="w-full">
                {/* Backdrop Image */}
                <div className="w-full h-62.5 md:h-[50vh]">
                    <Image
                        src={property.poster_path}
                        alt={`${property.title} trailer`}
                        width={800}
                        height={300}
                        className="w-full h-87.5 md:h-[50vh] object-cover"
                    />
                </div>

                {/* Overlay content */}
                <div className="px-4 md:px-12 -mt-25 md:-mt-37.5">
                    <div className="flex flex-col md:flex-row">
                        {/* Poster */}
                        <div className="w-[130px] md:w-[230px]">
                            <Image
                                src={property.poster_path}
                                alt={`${property.title} poster`}
                                width={230}
                                height={325}
                                className="h-[200px] md:h-[325px] w-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Details */}
                        <div className="ml-0 md:ml-6 mt-4 md:mt-0 content-end">
                            <div className="text-xl md:text-2xl font-semibold">{property.title}</div>

                            {/* Ratings */}
                            <div className="flex gap-6 mt-2 text-sm md:text-base text-[#A3A3A3]">
                                <div className="flex items-center">
                                    <FaImdb size={20} color="#EDBF17" className="mr-1.5" />
                                    {property.rating ? `${property.rating}/10.0` : "N/A"}
                                </div>
                                <div className="flex items-center">
                                    <GiTomato color="red" size={20} className="mr-1.5" />
                                    &quot;N/A&quot;
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {property.genre_ids?.length > 0
                                    ? property.genre_ids.map((genreType, index) => (
                                        <button key={index} className="btn-one">{genreType}</button>
                                    ))
                                    : <button>Uncategorized</button>
                                }
                            </div>

                            {/* Extra Info */}
                            <div className="flex gap-6 mt-3 text-sm md:text-base">
                                <div>
                                    <p>Year</p>
                                    <p className="text-[#A3A3A3]">{property.year || "—"}</p>
                                </div>
                                <div>
                                    <p>Language</p>
                                    <p className="text-[#A3A3A3]">{property.language || "—"}</p>
                                </div>
                                <div>
                                    <p>Rating</p>
                                    <p className="text-[#A3A3A3]">{property.ageRating || "—"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Action buttons */}
            <div className="flex py-3 space-x-5">
                <button
                    className={`flex btn-one items-center ${isSaved ? "btn-active" : "btn-one"}`}
                    onClick={handleSave}
                >
                    {isSaved
                        ? <FaBookmark size={17} className="pr-1.5" />
                        : <FaRegBookmark size={17} className="pr-1.5" />
                    }
                    {isSaved ? "Saved" : "Save"}
                </button>
                <button className="flex btn-one items-center">
                    <MdOutlineStarRate size={24} className="pr-1" />Rate
                </button>
                <button className="flex btn-one items-center">
                    <FaPlus size={20} className="pr-1" />Lists
                </button>
            </div>

            {/* Tabs */}
            <div className="p-5 rounded-tr-3xl rounded-tl-3xl bg-[#404040] text-[#A3A3A3]">
                <div>
                    <div className="inline-flex space-x-4">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`px-2 py-1 hover:rounded-lg ${activeTab === index
                                    ? "rounded-lg btn-active"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 md:w-1/2">
                        {tabs[activeTab].content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;
