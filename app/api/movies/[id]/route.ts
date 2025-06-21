import TMDBApi from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> } 
) {
    try {
        const api = await TMDBApi();
        const awaitedParams = await params;
        const movieId = awaitedParams.id;

        if (!movieId) {
            return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
        }
        
        const movie = await api.fetchMovieDetails(movieId);
        return NextResponse.json(movie);
    } catch (error) {
        console.error('Error in movie details route:', error);
        return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
    }
}
