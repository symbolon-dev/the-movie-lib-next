import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { DiscoverMoviesParamsSchema } from '@/schemas/api-params';
import { MovieResponseSchema } from '@/schemas/movie';
import { MovieDiscoverParams } from '@/types/movie';
import TMDBApi from '@/utils/api';
import { handleApiError } from '@/utils/error-handler/api-error-handler';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;

        const validatedParams = DiscoverMoviesParamsSchema.parse({
            page: searchParams.get('page'),
            sort_by: searchParams.get('sort_by'),
            with_genres: searchParams.get('with_genres'),
        });

        const params: MovieDiscoverParams = {
            page: validatedParams.page,
            sortBy: validatedParams.sort_by,
            withGenres: validatedParams.with_genres,
        };

        const api = await TMDBApi();
        const movies = await api.discoverMovies(params);

        const validatedResponse = MovieResponseSchema.parse(movies);

        return NextResponse.json(validatedResponse);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request parameters', details: error.errors },
                { status: 400 },
            );
        }
        return handleApiError(error, 'discover', 'movies');
    }
};
