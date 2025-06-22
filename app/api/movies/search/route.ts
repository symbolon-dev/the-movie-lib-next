import { NextRequest, NextResponse } from 'next/server';

import TMDBApi from '@/lib/api';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');

        if (!query || query.trim() === '') {
            return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
        }

        const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1;

        const api = await TMDBApi();
        const movies = await api.searchMovies(query, page);
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in search route:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to fetch movies',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
