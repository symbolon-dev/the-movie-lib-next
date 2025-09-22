import { getTime } from 'date-fns';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Movie, MovieDiscoverParams, MovieResponse } from '@/types/movie';
import { handleStoreError } from '@/utils/error-handler/store-error-handler';
import { useCacheStore } from './cache-store';
import { useFilterStore } from './filter-store';
import { usePaginationStore } from './pagination-store';

export type MovieState = {
    movies: Movie[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    dedupeMovies: () => void;
    clearMovies: () => void;
    loadMoreMovies: () => Promise<void>;
    fetchMovies: () => Promise<void>;
    discoverMovies: (params?: MovieDiscoverParams) => Promise<void>;
    searchMovies: (query: string) => Promise<void>;
    getMovies: () => Promise<Movie[]>;
    hasMoviesForCurrentParams: () => boolean;
    ensureMoviesLoaded: () => void;
};

const MIN_RESULTS = 25;

const noopStorage: Storage = {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
    clear: () => undefined,
    key: () => null,
    get length() {
        return 0;
    },
};

const dedupeMoviesById = (items: Movie[]): Movie[] => {
    const seen = new Set<number | string>();
    return items.filter((movie) => {
        const key = movie.id;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

export const useMovieStore = create<MovieState>()(
    persist(
        (set, get) => ({
            movies: undefined,
            isLoading: false,
            error: undefined,

            dedupeMovies: () => {
                const currentMovies = get().movies;
                if (!currentMovies) return;
                set({ movies: dedupeMoviesById(currentMovies) });
            },

            clearMovies: () => {
                set({ movies: undefined });
            },

            loadMoreMovies: async () => {
                const paginationStore = usePaginationStore.getState();
                if (paginationStore.canLoadMore()) {
                    paginationStore.setPage(paginationStore.getNextPage());
                    await get().fetchMovies();
                }
            },

            fetchMovies: async () => {
                if (get().hasMoviesForCurrentParams()) {
                    return;
                }

                const filterStore = useFilterStore.getState();
                const { searchQuery } = filterStore;

                if (searchQuery && searchQuery.trim().length > 0) {
                    return get().searchMovies(searchQuery);
                }
                return get().discoverMovies();
            },

            discoverMovies: async (params?: MovieDiscoverParams) => {
                try {
                    const cacheStore = useCacheStore.getState();
                    cacheStore.abortCurrentRequest();

                    const abortController = new AbortController();
                    cacheStore.setAbortController(abortController);

                    set({
                        isLoading: true,
                        error: undefined,
                    });

                    const filterStore = useFilterStore.getState();
                    const paginationStore = usePaginationStore.getState();
                    const { sortBy, selectedGenres } = filterStore;
                    const { currentPage } = paginationStore;

                    const sortByParam = params?.sortBy || sortBy;
                    const genresParam = selectedGenres.length > 0 ? selectedGenres.join(',') : '';
                    const pageToUse = params?.page || currentPage;

                    const url = `/api/movies/discover?sort_by=${sortByParam}&with_genres=${genresParam}&page=${pageToUse}`;

                    const response = await fetch(url, { signal: abortController.signal });

                    if (!response.ok) {
                        throw new Error(`Error fetching movies: ${response.statusText}`);
                    }

                    const json = await response.json();
                    if (json.error) {
                        throw new Error(json.error);
                    }

                    const movies = json as MovieResponse;

                    const existingMovies = get().movies || [];
                    let aggregatedMovies = dedupeMoviesById(
                        pageToUse === 1 ? movies.results : [...existingMovies, ...movies.results],
                    );
                    let finalPageUsed = pageToUse;

                    while (
                        aggregatedMovies.length < MIN_RESULTS &&
                        finalPageUsed < movies.total_pages &&
                        !abortController.signal.aborted
                    ) {
                        const nextPage = finalPageUsed + 1;
                        const nextUrl = `/api/movies/discover?sort_by=${sortByParam}&with_genres=${genresParam}&page=${nextPage}`;
                        const nextResponse = await fetch(nextUrl, {
                            signal: abortController.signal,
                        });

                        if (!nextResponse.ok) {
                            throw new Error(`Error fetching movies: ${nextResponse.statusText}`);
                        }

                        const nextJson = await nextResponse.json();
                        if (nextJson.error) {
                            throw new Error(nextJson.error);
                        }

                        const nextMovies = nextJson as MovieResponse;
                        aggregatedMovies = dedupeMoviesById([
                            ...aggregatedMovies,
                            ...nextMovies.results,
                        ]);
                        finalPageUsed = nextPage;
                    }

                    const currentParams = JSON.stringify({
                        searchQuery: filterStore.searchQuery,
                        sortBy: sortByParam,
                        selectedGenres,
                        currentPage: finalPageUsed,
                    });

                    paginationStore.setPage(finalPageUsed);
                    paginationStore.setPaginationData(movies.total_pages, movies.total_results);
                    cacheStore.setLastFetchParams(currentParams);
                    cacheStore.setAbortController(undefined);

                    set({
                        movies: aggregatedMovies,
                        isLoading: false,
                    });
                } catch (error) {
                    if ((error as Error).name === 'AbortError') {
                        return;
                    }
                    const cacheStore = useCacheStore.getState();
                    cacheStore.setAbortController(undefined);
                    set({ isLoading: false });
                    handleStoreError(error, 'fetch movies', set);
                }
            },

            searchMovies: async (query: string) => {
                if (!query || query.trim() === '') {
                    return get().discoverMovies();
                }

                try {
                    const cacheStore = useCacheStore.getState();
                    cacheStore.abortCurrentRequest();

                    const abortController = new AbortController();
                    cacheStore.setAbortController(abortController);

                    set({
                        isLoading: true,
                        error: undefined,
                    });

                    const filterStore = useFilterStore.getState();
                    const paginationStore = usePaginationStore.getState();
                    const { selectedGenres, sortBy } = filterStore;
                    const { currentPage } = paginationStore;

                    const pageParam = currentPage ? `&page=${currentPage}` : '';
                    const url = `/api/movies/search?query=${encodeURIComponent(query)}${pageParam}`;

                    const response = await fetch(url, { signal: abortController.signal });

                    if (!response.ok) {
                        throw new Error(`Error searching movies: ${response.statusText}`);
                    }

                    const json = await response.json();
                    if (json.error) {
                        const errorDetails = json.details ? `: ${json.details}` : '';
                        throw new Error(`${json.error}${errorDetails}`);
                    }

                    const processResults = (items: Movie[]): Movie[] => {
                        let processed = items;
                        if (selectedGenres.length > 0) {
                            processed = processed.filter((movie) =>
                                movie.genre_ids.some((genreId) => selectedGenres.includes(genreId)),
                            );
                        }

                        if (sortBy) {
                            const [field, direction] = sortBy.split('.');
                            const isAsc = direction === 'asc';

                            processed = [...processed].sort((a, b) => {
                                const getValue = (movie: Movie): string | number => {
                                    const fieldMap: Record<string, () => string | number> = {
                                        title: () => movie.title.toLowerCase(),
                                        original_title: () => movie.original_title.toLowerCase(),
                                        primary_release_date: () =>
                                            getTime(new Date(movie.release_date)),
                                        popularity: () => Number(movie.popularity ?? 0),
                                        vote_average: () => Number(movie.vote_average ?? 0),
                                        vote_count: () => Number(movie.vote_count ?? 0),
                                    };

                                    return (
                                        fieldMap[field]?.() ||
                                        String(movie[field as keyof Movie] ?? '')
                                    );
                                };

                                const valueA = getValue(a);
                                const valueB = getValue(b);

                                if (valueA === valueB) return 0;
                                return isAsc
                                    ? valueA > valueB
                                        ? 1
                                        : -1
                                    : valueA < valueB
                                      ? 1
                                      : -1;
                            });
                        }

                        return processed;
                    };

                    const movies = json as MovieResponse;
                    const baseResults = processResults(movies.results);

                    const existingMovies = get().movies || [];
                    let aggregatedMovies = dedupeMoviesById(
                        currentPage === 1 ? baseResults : [...existingMovies, ...baseResults],
                    );
                    let finalPageUsed = currentPage || 1;

                    while (
                        aggregatedMovies.length < MIN_RESULTS &&
                        finalPageUsed < movies.total_pages &&
                        !abortController.signal.aborted
                    ) {
                        const nextPage = finalPageUsed + 1;
                        const nextUrl = `/api/movies/search?query=${encodeURIComponent(query)}&page=${nextPage}`;
                        const nextResponse = await fetch(nextUrl, {
                            signal: abortController.signal,
                        });

                        if (!nextResponse.ok) {
                            throw new Error(`Error searching movies: ${nextResponse.statusText}`);
                        }

                        const nextJson = await nextResponse.json();
                        if (nextJson.error) {
                            const errorDetails = nextJson.details ? `: ${nextJson.details}` : '';
                            throw new Error(`${nextJson.error}${errorDetails}`);
                        }

                        const nextMovies = nextJson as MovieResponse;
                        const processedNext = processResults(nextMovies.results);
                        aggregatedMovies = dedupeMoviesById([
                            ...aggregatedMovies,
                            ...processedNext,
                        ]);
                        finalPageUsed = nextPage;
                    }

                    if (sortBy) {
                        aggregatedMovies = processResults(aggregatedMovies);
                    }

                    const currentParams = JSON.stringify({
                        searchQuery: query,
                        sortBy,
                        selectedGenres,
                        currentPage: finalPageUsed,
                    });

                    paginationStore.setPage(finalPageUsed);
                    paginationStore.setPaginationData(movies.total_pages, movies.total_results);
                    cacheStore.setLastFetchParams(currentParams);
                    cacheStore.setAbortController(undefined);

                    set({
                        movies: aggregatedMovies,
                        isLoading: false,
                    });
                } catch (error) {
                    if ((error as Error).name === 'AbortError') {
                        return;
                    }
                    const cacheStore = useCacheStore.getState();
                    cacheStore.setAbortController(undefined);
                    set({ isLoading: false });
                    handleStoreError(error, 'search movies', set);
                }
            },

            getMovies: async (): Promise<Movie[]> => {
                const { movies } = get();
                const filterStore = useFilterStore.getState();
                const paginationStore = usePaginationStore.getState();
                const cacheStore = useCacheStore.getState();

                const currentParams = JSON.stringify({
                    searchQuery: filterStore.searchQuery,
                    sortBy: filterStore.sortBy,
                    selectedGenres: filterStore.selectedGenres,
                    currentPage: paginationStore.currentPage,
                });

                if (movies && cacheStore.hasValidCache(currentParams)) {
                    return movies;
                }

                if (!movies) {
                    await get().fetchMovies();
                    return get().movies || [];
                }

                return movies;
            },

            hasMoviesForCurrentParams: (): boolean => {
                const { movies } = get();
                if (!movies) return false;

                const filterStore = useFilterStore.getState();
                const paginationStore = usePaginationStore.getState();
                const cacheStore = useCacheStore.getState();

                const currentParams = JSON.stringify({
                    searchQuery: filterStore.searchQuery,
                    sortBy: filterStore.sortBy,
                    selectedGenres: filterStore.selectedGenres,
                    currentPage: paginationStore.currentPage,
                });
                return cacheStore.hasValidCache(currentParams);
            },

            ensureMoviesLoaded: (): void => {
                if (!get().hasMoviesForCurrentParams()) {
                    get().fetchMovies();
                }
            },
        }),
        {
            name: 'movie-store',
            storage: createJSONStorage(() =>
                typeof window === 'undefined' ? noopStorage : localStorage,
            ),
            partialize: (state) => ({
                movies: state.movies,
            }),
            onRehydrateStorage: () => (hydratedState) => {
                hydratedState?.dedupeMovies();
            },
        },
    ),
);
