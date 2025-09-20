import { NextRequest, NextResponse } from 'next/server';
import { MovieDiscoverParams } from '@/types/movie';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

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
        return handleApiError(error, 'discover', 'movies');
    }
}
