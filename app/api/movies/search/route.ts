import { NextRequest, NextResponse } from 'next/server';

import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

export const GET = async (request: NextRequest) => {
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
        return handleApiError(error, 'search', 'movies');
    }
};
