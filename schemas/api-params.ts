import { z } from 'zod';

export const MovieSortOptionSchema = z.enum([
    'popularity.desc',
    'popularity.asc',
    'primary_release_date.desc',
    'primary_release_date.asc',
    'title.asc',
    'title.desc',
    'vote_average.desc',
    'vote_average.asc',
    'original_title.asc',
    'original_title.desc',
    'revenue.asc',
    'revenue.desc',
    'vote_count.asc',
    'vote_count.desc',
]);

export const DiscoverMoviesParamsSchema = z.object({
    page: z.coerce.number().int().min(1).max(500).default(1),
    sort_by: MovieSortOptionSchema.default('popularity.desc'),
    with_genres: z.string().optional(),
});

export const SearchMoviesParamsSchema = z.object({
    query: z.string().min(1, 'Search query is required'),
    page: z.coerce.number().int().min(1).max(500).default(1),
});
