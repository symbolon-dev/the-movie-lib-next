import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { SearchMoviesParamsSchema } from '@/schemas/api-params';
import { MovieResponseSchema } from '@/schemas/movie';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;

        const validatedParams = SearchMoviesParamsSchema.parse({
            query: searchParams.get('query'),
            page: searchParams.get('page'),
        });

        const api = await TMDBApi();
        const movies = await api.searchMovies(validatedParams.query, validatedParams.page);

        const validatedResponse = MovieResponseSchema.parse(movies);

        return NextResponse.json(validatedResponse);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.errors },
                { status: 400 },
            );
        }
        return handleApiError(error, 'search', 'movies');
    }
};
