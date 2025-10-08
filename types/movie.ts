import { z } from 'zod';

import {
    GenreResponseSchema,
    GenreSchema,
    MovieDetailSchema,
    MovieResponseSchema,
    MovieSchema,
    ProductionCompanySchema,
    ProductionCountrySchema,
    SpokenLanguageSchema,
} from '@/schemas/movie';

type Movie = z.infer<typeof MovieSchema>;
type MovieDetail = z.infer<typeof MovieDetailSchema>;
type MovieResponse = z.infer<typeof MovieResponseSchema>;
type MovieGenre = z.infer<typeof GenreSchema>;
type GenreResponse = z.infer<typeof GenreResponseSchema>;
type ProductionCompany = z.infer<typeof ProductionCompanySchema>;
type ProductionCountry = z.infer<typeof ProductionCountrySchema>;
type SpokenLanguage = z.infer<typeof SpokenLanguageSchema>;

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
    GenreResponse,
    Movie,
    MovieDetail,
    MovieDiscoverParams,
    MovieFilter,
    MovieGenre,
    MovieResponse,
    MovieSortOption,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
};
