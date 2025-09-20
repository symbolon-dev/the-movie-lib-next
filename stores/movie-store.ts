import { getTime } from 'date-fns';
import { create } from 'zustand';
import { Movie, MovieDiscoverParams, MovieResponse, MovieSortOption } from '@/types/movie';
import { handleStoreError } from '@/utils/error-handler/store-error-handler';

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
    lastFetchParams: string | undefined;
    abortController: AbortController | undefined;
    setSortBy: (sortOption: MovieSortOption) => void;
    setSelectedGenres: (genres: number[]) => void;
    setSearchQuery: (query: string) => void;
    setPage: (page: number) => void;
    loadMoreMovies: () => Promise<void>;
    resetFilters: () => void;
    fetchMovies: () => Promise<void>;
    discoverMovies: (params?: MovieDiscoverParams) => Promise<void>;
    searchMovies: (query: string) => Promise<void>;
    fetchGenres: () => Promise<void>;
    getGenres: () => Promise<{ id: number; name: string }[] | undefined>;
    getMovies: () => Promise<Movie[]>;
    hasMoviesForCurrentParams: () => boolean;
    ensureMoviesLoaded: () => void;
    invalidateCache: () => void;
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
    lastFetchParams: undefined,
    abortController: undefined,

    setSortBy: (sortOption: MovieSortOption) => {
        set({
            sortBy: sortOption,
            currentPage: 1,
            movies: [],
            lastFetchParams: undefined,
        });
        get().fetchMovies();
    },

    setSelectedGenres: (genres: number[]) => {
        set({
            selectedGenres: genres,
            currentPage: 1,
            movies: [],
            lastFetchParams: undefined,
        });
        get().fetchMovies();
    },

    setSearchQuery: (query: string) => {
        set({
            searchQuery: query,
            currentPage: 1,
            movies: [], // Clear movies when search changes
            lastFetchParams: undefined, // Clear cache
        });
        get().fetchMovies();
    },

    setPage: (page: number) => {
        set({
            currentPage: page,
            // Don't clear movies for pagination to avoid layout jump
            lastFetchParams: undefined, // But clear cache to force new fetch
        });
        get().fetchMovies();
    },

    loadMoreMovies: async () => {
        const { currentPage, totalPages } = get();
        if (currentPage < totalPages) {
            set({ currentPage: currentPage + 1 });
            await get().fetchMovies();
        }
    },

    resetFilters: () => {
        set({
            searchQuery: '',
            selectedGenres: [],
            sortBy: 'popularity.desc',
            currentPage: 1,
            movies: [],
            lastFetchParams: undefined, // Clear cache to force reload
        });
        get().fetchMovies();
    },

    fetchMovies: async () => {
        if (get().hasMoviesForCurrentParams()) {
            return;
        }

        const { searchQuery } = get();

        if (searchQuery && searchQuery.trim().length > 0) {
            return get().searchMovies(searchQuery);
        }
        return get().discoverMovies();
    },

    discoverMovies: async (params?: MovieDiscoverParams) => {
        try {
            // Cancel any ongoing request
            const { abortController: existingController } = get();
            if (existingController) {
                existingController.abort();
            }

            // Create new abort controller
            const abortController = new AbortController();

            set({
                isLoading: true,
                error: undefined,
                abortController,
            });

            const { sortBy, selectedGenres, currentPage } = get();

            const sortByParam = params?.sortBy || sortBy;
            const genresParam = selectedGenres.length > 0 ? selectedGenres.join(',') : '';
            const pageToUse = params?.page || currentPage;

            const url = `/api/movies/discover?sort_by=${sortByParam}&with_genres=${genresParam}&page=${pageToUse}`;

            // Artificial delay to show skeleton loading
            const [response] = await Promise.all([
                fetch(url, { signal: abortController.signal }),
                new Promise((resolve) => setTimeout(resolve, 800)),
            ]);
            if (!response.ok) {
                throw new Error(`Error fetching movies: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }
            const movies = json as MovieResponse;

            const currentParams = JSON.stringify({
                searchQuery: get().searchQuery,
                sortBy: sortByParam,
                selectedGenres,
                currentPage: pageToUse,
            });

            const existingMovies = get().movies || [];
            const newMovies =
                pageToUse === 1 ? movies.results : [...existingMovies, ...movies.results];

            set({
                movies: newMovies,
                isLoading: false,
                totalPages: movies.total_pages,
                totalResults: movies.total_results,
                lastFetchParams: currentParams,
            });
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                return; // Request was cancelled, ignore
            }
            handleStoreError(error, 'fetch movies', set);
        }
    },

    searchMovies: async (query: string) => {
        if (!query || query.trim() === '') {
            return get().discoverMovies();
        }

        try {
            // Cancel any ongoing request
            const { abortController: existingController } = get();
            if (existingController) {
                existingController.abort();
            }

            // Create new abort controller
            const abortController = new AbortController();

            set({
                isLoading: true,
                error: undefined,
                abortController,
            });

            const { selectedGenres, sortBy, currentPage } = get();

            const pageParam = currentPage ? `&page=${currentPage}` : '';
            const url = `/api/movies/search?query=${encodeURIComponent(query)}${pageParam}`;

            // Artificial delay to show skeleton loading
            const [response] = await Promise.all([
                fetch(url, { signal: abortController.signal }),
                new Promise((resolve) => setTimeout(resolve, 800)),
            ]);
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
                            primary_release_date: () => getTime(new Date(movie.release_date)),
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

            const currentParams = JSON.stringify({
                searchQuery: query,
                sortBy,
                selectedGenres,
                currentPage,
            });

            const existingMovies = get().movies || [];
            const newMovies =
                currentPage === 1 ? movies.results : [...existingMovies, ...movies.results];

            set({
                movies: newMovies,
                isLoading: false,
                totalPages: movies.total_pages,
                totalResults: movies.total_results,
                lastFetchParams: currentParams,
            });
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                return; // Request was cancelled, ignore
            }
            handleStoreError(error, 'search movies', set);
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
            handleStoreError(error, 'fetch genres', set);
        }
    },

    getGenres: async (): Promise<{ id: number; name: string }[] | undefined> => {
        if (get().genres) {
            return get().genres;
        }
        await get().fetchGenres();
        return get().genres;
    },

    getMovies: async (): Promise<Movie[]> => {
        const { movies, searchQuery, sortBy, selectedGenres, currentPage, lastFetchParams } = get();

        const currentParams = JSON.stringify({ searchQuery, sortBy, selectedGenres, currentPage });

        if (movies && lastFetchParams === currentParams) {
            return movies;
        }

        if (!movies) {
            await get().fetchMovies();
            return get().movies || [];
        }

        return movies;
    },

    hasMoviesForCurrentParams: (): boolean => {
        const { movies, searchQuery, sortBy, selectedGenres, currentPage, lastFetchParams } = get();

        if (!movies) return false;

        const currentParams = JSON.stringify({ searchQuery, sortBy, selectedGenres, currentPage });
        return lastFetchParams === currentParams;
    },

    ensureMoviesLoaded: (): void => {
        if (!get().hasMoviesForCurrentParams()) {
            get().fetchMovies();
        }
    },

    invalidateCache: (): void => {
        set({ lastFetchParams: undefined });
    },
}));
