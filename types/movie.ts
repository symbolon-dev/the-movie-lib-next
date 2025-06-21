import { z } from 'zod';
import { MovieSchema, MovieDetailSchema, MovieResponseSchema, GenreSchema } from '@/lib/schema';

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieGenre = z.infer<typeof GenreSchema>;

export const MovieSortOptions = {
    ORIGINAL_TITLE_ASC: 'original_title.asc',
    ORIGINAL_TITLE_DESC: 'original_title.desc',
    POPULARITY_ASC: 'popularity.asc',
    POPULARITY_DESC: 'popularity.desc',
    REVENUE_ASC: 'revenue.asc',
    REVENUE_DESC: 'revenue.desc',
    RELEASE_DATE_ASC: 'primary_release_date.asc',
    RELEASE_DATE_DESC: 'primary_release_date.desc',
    TITLE_ASC: 'title.asc',
    TITLE_DESC: 'title.desc',
    VOTE_AVERAGE_ASC: 'vote_average.asc',
    VOTE_AVERAGE_DESC: 'vote_average.desc',
    VOTE_COUNT_ASC: 'vote_count.asc',
    VOTE_COUNT_DESC: 'vote_count.desc',
} as const;

export type MovieSortOption = (typeof MovieSortOptions)[keyof typeof MovieSortOptions];

export type MovieFilter = {
    query: string;
    genre: string;
    sortBy: MovieSortOption;
}

export type MovieDiscoverParams = {
    page?: number;
    sortBy?: MovieSortOption;
    withGenres?: string;
};
