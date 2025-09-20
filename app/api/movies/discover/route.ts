import { NextRequest, NextResponse } from 'next/server';
import TMDBApi from '@/lib/api';
import { MovieDiscoverParams } from '@/types/movie';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const params: MovieDiscoverParams = {
            page: searchParams.has('page') ? Number(searchParams.get('page')) : undefined,
            sortBy: searchParams.get('sort_by') ?? undefined,
            withGenres: searchParams.get('with_genres') ?? undefined,
        };

        const api = await TMDBApi();
        const movies = await api.discoverMovies(params);
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in discover route:', error);
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
