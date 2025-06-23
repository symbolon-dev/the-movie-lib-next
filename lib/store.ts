import dayjs from 'dayjs';
import { create } from 'zustand';

import {
    Movie,
    MovieDiscoverParams,
    MovieResponse,
    MovieSortOption,
} from '@/types/movie';

type MovieState = {
    movies: Movie[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    sortBy: MovieSortOption;
    selectedGenres: number[];
    searchQuery: string;
    genres: { id: number; name: string }[] | undefined;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    setSortBy: (sortOption: MovieSortOption) => void;
    setSelectedGenres: (genres: number[]) => void;
    setSearchQuery: (query: string) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
    fetchMovies: () => Promise<void>;
    discoverMovies: (params?: MovieDiscoverParams) => Promise<void>;
    searchMovies: (query: string) => Promise<void>;
    fetchGenres: () => Promise<void>;
    getGenres: () => Promise<{ id: number; name: string }[] | undefined>;
};

export const useMovieStore = create<MovieState>((set, get) => ({
    movies: undefined,
    isLoading: false,
    error: undefined,
    sortBy: 'popularity.desc',
    selectedGenres: [],
    searchQuery: '',
    genres: undefined,
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,

    setSortBy: (sortOption: MovieSortOption) => {
        set({ sortBy: sortOption, currentPage: 1 });
        get().fetchMovies();
    },

    setSelectedGenres: (genres: number[]) => {
        set({ selectedGenres: genres, currentPage: 1 });
        get().fetchMovies();
    },

    setSearchQuery: (query: string) => {
        set({ searchQuery: query, currentPage: 1 });
        get().fetchMovies();
    },

    setPage: (page: number) => {
        set({ currentPage: page });
        get().fetchMovies();
    },

    resetFilters: () => {
        set({
            searchQuery: '',
            selectedGenres: [],
            sortBy: 'popularity.desc',
            currentPage: 1,
        });
        get().fetchMovies();
    },

    fetchMovies: async () => {
        const { searchQuery } = get();

        if (searchQuery && searchQuery.trim().length > 0) {
            return get().searchMovies(searchQuery);
        }
        return get().discoverMovies();
    },

    discoverMovies: async (params?: MovieDiscoverParams) => {
        try {
            set({
                isLoading: true,
                error: undefined,
            });

            const { sortBy, selectedGenres, currentPage } = get();

            const sortByParam = params?.sortBy || sortBy;
            const genresParam = selectedGenres.length > 0 ? selectedGenres.join(',') : '';
            const pageToUse = params?.page || currentPage;

            const url = `/api/movies/discover?sort_by=${sortByParam}&with_genres=${genresParam}&page=${pageToUse}`;

            const response = await fetch(url);
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
                totalPages: movies.total_pages,
                totalResults: movies.total_results,
            });
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            set({
                error: error instanceof Error ? error.message : 'An unknown error occurred',
                isLoading: false,
            });
        }
    },

    searchMovies: async (query: string) => {
        if (!query || query.trim() === '') {
            return get().discoverMovies();
        }

        try {
            set({
                isLoading: true,
                error: undefined,
            });

            const { selectedGenres, sortBy, currentPage } = get();

            const pageParam = currentPage ? `&page=${currentPage}` : '';
            const url = `/api/movies/search?query=${encodeURIComponent(query)}${pageParam}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error searching movies: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                const errorDetails = json.details ? `: ${json.details}` : '';
                throw new Error(`${json.error}${errorDetails}`);
            }

            const movies = json as MovieResponse;
            if (selectedGenres.length > 0) {
                movies.results = movies.results.filter((movie) =>
                    movie.genre_ids.some((genreId) => selectedGenres.includes(genreId)),
                );
            }

            if (sortBy) {
                const [field, direction] = sortBy.split('.');
                const isAsc = direction === 'asc';

                movies.results.sort((a, b) => {
                    const getValue = (movie: Movie): string | number => {
                        const fieldMap: Record<string, () => string | number> = {
                            title: () => movie.title.toLowerCase(),
                            original_title: () => movie.original_title.toLowerCase(),
                            primary_release_date: () => dayjs(movie.release_date).valueOf(),
                            popularity: () => Number(movie.popularity ?? 0),
                            vote_average: () => Number(movie.vote_average ?? 0),
                            vote_count: () => Number(movie.vote_count ?? 0),
                        };

                        return fieldMap[field]?.() || String(movie[field as keyof Movie] ?? '');
                    };

                    const valueA = getValue(a);
                    const valueB = getValue(b);

                    return isAsc ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
                });
            }

            set({
                movies: movies.results,
                isLoading: false,
                totalPages: movies.total_pages,
                totalResults: movies.total_results,
            });
        } catch (error) {
            console.error('Failed to search movies:', error);
            set({
                error: error instanceof Error ? error.message : 'An unknown error occurred',
                isLoading: false,
            });
        }
    },

    fetchGenres: async () => {
        try {
            set({
                isLoading: true,
                error: undefined,
            });

            const response = await fetch('/api/movies/genre');

            if (!response.ok) {
                throw new Error(`Error fetching genres: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }

            set({
                genres: json.genres,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            set({
                error: error instanceof Error ? error.message : 'An unknown error occurred',
                isLoading: false,
            });
        }
    },

    getGenres: async () => {
        if (get().genres) {
            return get().genres;
        }
        await get().fetchGenres();
        return get().genres;
    },
}));
