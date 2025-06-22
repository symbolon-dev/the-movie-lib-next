import { NextResponse } from 'next/server';

import TMDBApi from '@/lib/api';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const api = await TMDBApi();
        const movieId = params?.id;

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
        console.error('Error in movie details route:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (errorMessage.includes('404')) {
            return NextResponse.json(
                {
                    error: 'Movie not found',
                    details: 'The requested movie could not be found on TMDB',
                },
                { status: 404 },
            );
        }
        
        return NextResponse.json(
            {
                error: 'Failed to fetch movie',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
