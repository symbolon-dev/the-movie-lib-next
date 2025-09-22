import { NextResponse } from 'next/server';

import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

const CACHE_TIME = 60 * 60 * 24; // 24 hours
const REVALIDATE_TIME = 60 * 60; // 1 hour

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const api = await TMDBApi();
        const { id: movieId } = await params;

        const movie = await api.fetchMovieDetails(movieId);

        return NextResponse.json(movie, {
            headers: {
                'Cache-Control': `public, s-maxage=${CACHE_TIME}, stale-while-revalidate=${REVALIDATE_TIME}`,
            },
        });
    } catch (error) {
        return handleApiError(error, 'movie details', 'movies');
    }
};
