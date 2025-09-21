import { z } from 'zod';
import { GenreResponseSchema, MovieDetailSchema, MovieResponseSchema } from '@/schemas/movie';
import { MovieDiscoverParams } from '@/types/movie';

const TMDBApi = async () => {
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_BASE_URL;

    const fetchFromTMDB = async <T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> => {
        if (!API_KEY || !BASE_URL) {
            throw new Error('TMDB API key or TMDB base URL is not defined');
        }

        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Error fetching from TMDB: ${response.status} - ${response.statusText}`,
                );
            }

            const data = await response.json();

            try {
                return schema.parse(data);
            } catch (validationError) {
                console.error('Schema validation error:', validationError);
                throw new Error(
                    `Schema validation error: API response does not match the expected schema. ${validationError instanceof Error ? validationError.message : 'Unknown error'}`,
                );
            }
        } catch (error) {
            throw new Error(
                `Failed to fetch data from TMDB: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    };

    const discoverMovies = async (options?: MovieDiscoverParams) => {
        const page = options?.page?.toString() ?? '1';
        const sortBy = options?.sortBy ?? 'popularity.desc';
        const withGenres = options?.withGenres ?? '';

        try {
            return fetchFromTMDB(
                `/discover/movie?page=${page}&sort_by=${sortBy}&with_genres=${withGenres}&include_adult=false`,
                MovieResponseSchema,
            );
        } catch (error) {
            throw new Error(
                `Error discovering movies: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    };

    const searchMovies = async (query: string, page: number = 1) => {
        if (!query) {
            throw new Error('Search query cannot be empty');
        }

        try {
            return fetchFromTMDB(
                `/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
                MovieResponseSchema,
            );
        } catch (error) {
            throw new Error(
                `Error searching movies: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    };

    const fetchMovieDetails = async (id: string) => {
        if (!id) {
            throw new Error('Movie ID cannot be empty');
        }

        try {
            return fetchFromTMDB(`/movie/${id}`, MovieDetailSchema);
        } catch (error) {
            throw new Error(
                `Error fetching movie details: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    };

    const fetchMovieGenres = async () => {
        try {
            return fetchFromTMDB('/genre/movie/list', GenreResponseSchema);
        } catch (error) {
            throw new Error(
                `Error fetching movie genres: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    };

    return {
        fetchFromTMDB,
        discoverMovies,
        searchMovies,
        fetchMovieDetails,
        fetchMovieGenres,
    };
};

export default TMDBApi;
