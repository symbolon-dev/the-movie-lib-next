import { z } from 'zod';

import { GenreSchema, GenreResponseSchema, MovieDetailSchema, MovieResponseSchema, MovieSchema } from '@/lib/schema';

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieGenre = z.infer<typeof GenreSchema>;
export type GenreResponse = z.infer<typeof GenreResponseSchema>;

// Spezifische Typen für MovieInfo Komponente
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

export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'primary_release_date.desc', label: 'Release Date ↓' },
    { value: 'primary_release_date.asc', label: 'Release Date ↑' },
    { value: 'title.asc', label: 'Title ↑' },
    { value: 'title.desc', label: 'Title ↓' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'original_title.asc', label: 'Original Title ↑' },
    { value: 'original_title.desc', label: 'Original Title ↓' },
    { value: 'revenue.asc', label: 'Revenue ↑' },
    { value: 'revenue.desc', label: 'Revenue ↓' },
    { value: 'vote_count.asc', label: 'Vote Count ↑' },
    { value: 'vote_count.desc', label: 'Vote Count ↓' },
];

export type MovieSortOption = (typeof SORT_OPTIONS)[number]['value'];

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
