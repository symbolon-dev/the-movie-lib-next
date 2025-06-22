import { NextResponse } from 'next/server';

import TMDBApi from '@/lib/api';

export async function GET({ params }: { params: { id: string } }) {
    try {
        const api = await TMDBApi();
        const movieId = params?.id;

        if (!movieId) {
            return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
        }

        const movie = await api.fetchMovieDetails(movieId);
        return NextResponse.json(movie);
    } catch (error) {
        console.error('Error in movie details route:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to fetch movie',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
