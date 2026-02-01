import { ReactNode } from "react";

export interface ComponentProps {
    children: ReactNode;
}

export interface MovieApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: MainMovieProps[];
}

export interface MainMovieProps {
    movie_id: number;
    id?: number;
    title: string;
    name: string;
    vote_average: number;
    year?: number;
    genre_ids: number[];
    rating?: number;
    duration?: number;
    language?: string;
    release_date: string;
    director?: string;
    cast?: string[];
    overview: string;
    poster_path: string;
    backdropUrl?: string;
    trailerUrl?: string;
    isFeatured?: boolean;
    reviews?: Review[];
    ageRating?: string;
    boxOffice?: string;
    awards?: any[];
    tags?: string[];
    whereToWatch?: string[];
    addedAt?: string;
    description?: string;
}

export interface Review {
    user: string;
    comment: string;
    stars: number;
}

export interface AddPercentageProps extends Omit<MainMovieProps, "releaseDate"> {
    percentage?: string;
    releaseDate?: Date;
}

export type MatchDay = Pick<AddPercentageProps, "movie_id" | "poster_path" | "title" | "percentage">;

export interface GetRandomMovieProps {
    count: number;
    movies: AddPercentageProps[];
}

export interface GenreApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: GenreTypesProps[];
}

export interface GenreTypesProps {
    id: number;
    name: string;
}

export interface GenreProps {
    genres: GenreTypesProps[];
    selectedGenre: string | null;
    buttonClick: (genre: string) => void;
}