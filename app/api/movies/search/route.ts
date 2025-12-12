import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { searchMovies } from '@/lib/tmdb';
import { SearchMoviesParamsSchema } from '@/schemas/api-params';
import { createErrorResponse } from '@/utils/next-error-response';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;

        const validatedParams = SearchMoviesParamsSchema.parse({
            query: searchParams.get('query'),
            page: searchParams.get('page'),
        });

        const movies = await searchMovies(
            validatedParams.query,
            validatedParams.page,
        );

        return NextResponse.json(movies);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.issues },
                { status: 400 },
            );
        }
        return createErrorResponse(error, 'GET /api/movies/search');
    }
};
