import { create } from 'zustand';
import { MovieResponse, MovieDiscoverParams, MovieSortOptions } from '@/types/movie';

type MovieState = {
    movies: MovieResponse | undefined;
    isLoading: boolean;
    error: string | undefined;
    discoverMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: undefined,
    isLoading: false,
    error: undefined,
    discoverMovies: async () => { 
        try {
            set({ 
                isLoading: true, 
                error: undefined 
            });

            const response = await fetch('/api/movies/discover');
            if (!response.ok) {
                throw new Error(`Error fetching movies: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }
            const movies = json as MovieResponse;

            set({ 
                movies, 
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            set({ 
                error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten', 
                isLoading: false 
            });
        }
    },
}));
