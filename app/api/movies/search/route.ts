import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { SearchMoviesParamsSchema } from '@/schemas/api-params';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;

        const validatedParams = SearchMoviesParamsSchema.parse({
            query: searchParams.get('query'),
            page: searchParams.get('page'),
        });

        const api = TMDBApi();
        const movies = await api.searchMovies(validatedParams.query, validatedParams.page);

        return NextResponse.json(movies);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.errors },
                { status: 400 },
            );
        }
        return handleApiError(error, 'GET /api/movies/search');
    }
};
