import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { MovieIdParamSchema } from '@/schemas/api-params';
import { MovieDetailSchema } from '@/schemas/movie';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

const CACHE_TIME = 60 * 60 * 24; // 24 hours
const REVALIDATE_TIME = 60 * 60; // 1 hour

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id: movieId } = await params;

        const validatedParams = MovieIdParamSchema.parse({ id: movieId });

        const api = await TMDBApi();
        const movie = await api.fetchMovieDetails(validatedParams.id.toString());

        const validatedResponse = MovieDetailSchema.parse(movie);

        return NextResponse.json(validatedResponse, {
            headers: {
                'Cache-Control': `public, s-maxage=${CACHE_TIME}, stale-while-revalidate=${REVALIDATE_TIME}`,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.errors },
                { status: 400 },
            );
        }
        return handleApiError(error, 'movie details', 'movies');
    }
};
