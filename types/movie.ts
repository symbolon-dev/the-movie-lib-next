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

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieGenre = z.infer<typeof GenreSchema>;
export type GenreResponse = z.infer<typeof GenreResponseSchema>;
export type ProductionCompany = z.infer<typeof ProductionCompanySchema>;
export type ProductionCountry = z.infer<typeof ProductionCountrySchema>;
export type SpokenLanguage = z.infer<typeof SpokenLanguageSchema>;

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

export type MovieDiscoverParams = {
    page?: number;
    sortBy?: MovieSortOption;
    withGenres?: string;
};
