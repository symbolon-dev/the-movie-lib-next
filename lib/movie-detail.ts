import { cache } from 'react';

import { fetchMovieDetails } from '@/lib/tmdb';
import { MovieDetailSchema } from '@/schemas/movie';
import type { MovieDetail } from '@/types/movie';

export const getMovie = cache(async (id: string): Promise<MovieDetail> => {
    const data = await fetchMovieDetails(id);
    const validated = MovieDetailSchema.safeParse(data);

    if (!validated.success) {
        console.error('Movie validation failed:', validated.error);
        throw new Error('Invalid movie data');
    }

    return validated.data;
});
