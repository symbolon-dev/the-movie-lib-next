import { create } from 'zustand';
import { Movie, MovieDetail, MovieResponse } from '@/types/movie';

type MovieState = {
    movies: Movie[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    discoverMovies: () => Promise<void>;
    fetchMovieDetails: (id: string) => Promise<MovieDetail | undefined>;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: undefined,
    isLoading: false,
    error: undefined,

    discoverMovies: async () => { 
        try {
            set({ 
                isLoading: true, 
                error: undefined, 
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
                movies: movies.results, 
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },

    fetchMovieDetails: async (id: string) => {
        if (!id) {
            throw new Error('Movie ID cannot be empty');
        }

        try {
            set({ 
                isLoading: true, 
                error: undefined, 
            });

            const response = await fetch(`/api/movies/${id}`);

            if (!response.ok) {
                throw new Error(`Error fetching movie details: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }

            const movie = json as MovieDetail;

            set({ 
                isLoading: false, 
            });

            return movie;
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },
}));
