import { z } from 'zod';

export const MovieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const ProductionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string(),
});

export const ProductionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});

export const SpokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
});

export const MovieDetailSchema = MovieSchema.extend({
    genre_ids: z.array(z.number()).optional(),
    belongs_to_collection: z
        .object({
            id: z.number(),
            name: z.string(),
        })
        .nullable(),
    budget: z.number(),
    genres: z.array(GenreSchema),
    homepage: z.string().nullable(),
    imdb_id: z.string().nullable(),
    production_companies: z.array(ProductionCompanySchema),
    production_countries: z.array(ProductionCountrySchema),
    revenue: z.number(),
    runtime: z.number(),
    spoken_languages: z.array(SpokenLanguageSchema),
    status: z.string(),
    tagline: z.string().nullable(),
    video: z.boolean(),
});

export const MovieResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const GenreResponseSchema = z.object({
    genres: z.array(GenreSchema),
});
