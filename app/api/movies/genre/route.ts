import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { GenreResponseSchema } from '@/schemas/movie';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

const CACHE_TIME = 60 * 60 * 24 * 7; // 7 days
const REVALIDATE_TIME = 60 * 60 * 24; // 1 day

export const GET = async () => {
    try {
        const api = await TMDBApi();
        const genres = await api.fetchMovieGenres();

        const validatedResponse = GenreResponseSchema.parse(genres);

        return NextResponse.json(validatedResponse, {
            headers: {
                'Cache-Control': `public, s-maxage=${CACHE_TIME}, stale-while-revalidate=${REVALIDATE_TIME}`,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid response from TMDB API', details: error.errors },
                { status: 500 },
            );
        }
        return handleApiError(error, 'genre', 'genres');
    }
};
