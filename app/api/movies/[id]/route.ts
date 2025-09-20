import { NextResponse } from 'next/server';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler/apiErrorHandler';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const api = await TMDBApi();
        const { id: movieId } = await params;

        if (!movieId || movieId === 'undefined') {
            return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
        }

        if (isNaN(Number(movieId))) {
            return NextResponse.json({ error: 'Invalid movie ID format' }, { status: 400 });
        }

        const movie = await api.fetchMovieDetails(movieId);
        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json(movie);
    } catch (error) {
        return handleApiError(error, 'movie details', 'movies');
    }
}
