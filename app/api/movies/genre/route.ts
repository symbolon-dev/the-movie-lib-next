import { NextResponse } from 'next/server';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

const CACHE_TIME = 60 * 60 * 24 * 7; // 7 days
const REVALIDATE_TIME = 60 * 60 * 24; // 1 day

export const GET = async () => {
    try {
        const api = await TMDBApi();
        const movies = await api.fetchMovieGenres();
        return NextResponse.json(movies, {
            headers: {
                'Cache-Control': `public, s-maxage=${CACHE_TIME}, stale-while-revalidate=${REVALIDATE_TIME}`,
            },
        });
    } catch (error) {
        return handleApiError(error, 'genre', 'genres');
    }
};
