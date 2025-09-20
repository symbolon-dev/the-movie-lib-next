import { z } from 'zod';
import {
    GenreResponseSchema,
    GenreSchema,
    MovieDetailSchema,
    MovieResponseSchema,
    MovieSchema,
} from '@/schemas/movie';

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieGenre = z.infer<typeof GenreSchema>;
export type GenreResponse = z.infer<typeof GenreResponseSchema>;

export type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type MovieSortOption =
    | 'popularity.desc'
    | 'popularity.asc'
    | 'primary_release_date.desc'
    | 'primary_release_date.asc'
    | 'title.asc'
    | 'title.desc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';

export type MovieFilter = {
    query: string;
    genre: string;
    sortBy: MovieSortOption;
};

export type MovieDiscoverParams = {
    page?: number;
    sortBy?: MovieSortOption;
    withGenres?: string;
};
