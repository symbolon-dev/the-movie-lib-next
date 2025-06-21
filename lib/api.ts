import { z } from 'zod'
import { MovieResponseSchema, GenreSchema } from "@/lib/schema";
import { MovieDiscoverParams } from "@/types/movie";

const TMDBApi = async () => {
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_BASE_URL;
    
    const fetchFromTMDB = async <T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> => {
        console.log(API_KEY);
        
        if (!API_KEY || !BASE_URL) {
            throw new Error("TMDB API key or TMDB base URL is not defined");
        }

        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching from TMDB: ${response.status}`);
            }

            const data = await response.json();
            return schema.parse(data);
        } catch (error) {
            console.error("Error fetching from TMDB:", error);
            throw new Error("Failed to fetch data from TMDB");
        }
    };

    const discoverMovies = async (options?: MovieDiscoverParams) => { 
        const params = new URLSearchParams({
            page: options?.page?.toString() || '1',
            sort_by: options?.sortBy || 'popularity.desc',
            with_genres: options?.withGenres || '',
        });

        return fetchFromTMDB(`/discover/movie?${params}`, MovieResponseSchema);
    };

    const searchMovies = async (query: string, page: number = 1) => {
        if (!query) {
            throw new Error("Search query cannot be empty");
        }

        const params = new URLSearchParams({
            query: query,
            page: page.toString(),
        });

        return fetchFromTMDB(`/search/movie?${params}`, MovieResponseSchema);
    }

    const fetchMovieGenres = async () => {
        return fetchFromTMDB('/genre/movie/list', GenreSchema);
    };

    const fetchMoviePosterUrl = (path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500') => {
        if (!path) {
            throw new Error("Poster path cannot be empty");
        }
        
        return `${process.env.TMDB_IMAGE_BASE_URL}/${size}/${path}`;
    }
    
    return {
        fetchFromTMDB,
        discoverMovies,
        searchMovies,
        fetchMovieGenres,
        fetchMoviePosterUrl
    };
}

export default TMDBApi;
