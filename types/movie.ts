import { z } from 'zod';
import {
    GenreResponseSchema,
    GenreSchema,
    MovieDetailSchema,
    MovieResponseSchema,
    MovieSchema,
} from '@/schemas/movie';

type Movie = z.infer<typeof MovieSchema>;
type MovieDetail = z.infer<typeof MovieDetailSchema>;
type MovieResponse = z.infer<typeof MovieResponseSchema>;
type MovieGenre = z.infer<typeof GenreSchema>;
type GenreResponse = z.infer<typeof GenreResponseSchema>;

type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

type MovieSortOption =
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

type MovieFilter = {
    query: string;
    genre: string;
    sortBy: MovieSortOption;
};

type MovieDiscoverParams = {
    page?: number;
    sortBy?: MovieSortOption;
    withGenres?: string;
};

export type {
    Movie,
    MovieDetail,
    MovieResponse,
    MovieGenre,
    GenreResponse,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    MovieSortOption,
    MovieFilter,
    MovieDiscoverParams,
};
