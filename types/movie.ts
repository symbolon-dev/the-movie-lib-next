import { z } from 'zod';

import { MovieSortOptionSchema } from '@/schemas/api-params';
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

export type MovieSortOption = z.infer<typeof MovieSortOptionSchema>;

export type MovieDiscoverParams = {
    page?: number;
    sortBy?: MovieSortOption;
    withGenres?: string;
};
