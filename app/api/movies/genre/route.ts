import { NextResponse } from 'next/server';

import TMDBApi from '@/lib/api';

export async function GET() {
    try {
        const api = await TMDBApi();
        const movies = await api.fetchMovieGenres();
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in genre route:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to fetch genres',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
