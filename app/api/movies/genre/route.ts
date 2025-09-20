import { NextResponse } from 'next/server';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

export async function GET() {
    try {
        const api = await TMDBApi();
        const movies = await api.fetchMovieGenres();
        return NextResponse.json(movies);
    } catch (error) {
        return handleApiError(error, 'genre', 'genres');
    }
}
