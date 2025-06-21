import { z } from 'zod';

export const MovieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string(),
    genre_ids: z.array(z.number()).default([]),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const MovieDetailSchema = MovieSchema.extend({
    belongs_to_collection: z.object({
        id: z.number(),
        name: z.string(),
    }).nullable(),
    budget: z.number(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })),
    homepage: z.string(),
    imdb_id: z.string(),
    production_companies: z.array(z.object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
    })),
    production_countries: z.array(z.object({
        iso_3166_1: z.string(),
        name: z.string(),
    })),
    revenue: z.number(),
    runtime: z.number(),
    spoken_languages: z.array(z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
    })),
    status: z.string(),
    tagline: z.string(),
    video: z.boolean(),
});

export const MovieResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});
