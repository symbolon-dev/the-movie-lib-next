import type { NextRequest } from 'next/server';
import { connection, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { discoverMovies } from '@/lib/tmdb';
import { DiscoverMoviesParamsSchema } from '@/schemas/api-params';
import { createErrorResponse } from '@/utils/next-error-response';

export const GET = async (request: NextRequest) => {
    await connection();

    try {
        const searchParams = request.nextUrl.searchParams;

        const validatedParams = DiscoverMoviesParamsSchema.parse({
            page: searchParams.get('page'),
            sort_by: searchParams.get('sort_by'),
            with_genres: searchParams.get('with_genres'),
        });

        const movies = await discoverMovies({
            page: validatedParams.page,
            sortBy: validatedParams.sort_by,
            withGenres: validatedParams.with_genres,
        });

        return NextResponse.json(movies);
    }
    catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.issues },
                { status: 400 },
            );
        }
        return createErrorResponse(error, 'GET /api/movies/discover');
    }
};
