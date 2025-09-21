import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MovieSortOption } from '@/types/movie';

export type FilterState = {
    sortBy: MovieSortOption;
    selectedGenres: number[];
    searchQuery: string;
    setSortBy: (sortOption: MovieSortOption) => void;
    setSelectedGenres: (genres: number[]) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
    getCurrentFilterParams: () => string;
};

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

export const useFilterStore = create<FilterState>()(
    persist(
        (set, get) => ({
            sortBy: 'popularity.desc',
            selectedGenres: [],
            searchQuery: '',

            setSortBy: (sortOption: MovieSortOption) => {
                set({ sortBy: sortOption });
                // Trigger fetch in movie store
                setTimeout(() => {
                    import('./movie-store').then(({ useMovieStore }) => {
                        import('./pagination-store').then(({ usePaginationStore }) => {
                            import('./cache-store').then(({ useCacheStore }) => {
                                const movieStore = useMovieStore.getState();
                                const paginationStore = usePaginationStore.getState();
                                const cacheStore = useCacheStore.getState();

                                paginationStore.resetPagination();
                                cacheStore.invalidateCache();
                                movieStore.fetchMovies();
                            });
                        });
                    });
                }, 0);
            },

            setSelectedGenres: (genres: number[]) => {
                set({ selectedGenres: genres });
                // Trigger fetch in movie store
                setTimeout(() => {
                    import('./movie-store').then(({ useMovieStore }) => {
                        import('./pagination-store').then(({ usePaginationStore }) => {
                            import('./cache-store').then(({ useCacheStore }) => {
                                const movieStore = useMovieStore.getState();
                                const paginationStore = usePaginationStore.getState();
                                const cacheStore = useCacheStore.getState();

                                paginationStore.resetPagination();
                                cacheStore.invalidateCache();
                                movieStore.fetchMovies();
                            });
                        });
                    });
                }, 0);
            },

            setSearchQuery: (query: string) => {
                const currentQuery = get().searchQuery;
                set({ searchQuery: query });
                // Trigger fetch in movie store
                setTimeout(() => {
                    import('./movie-store').then(({ useMovieStore }) => {
                        import('./pagination-store').then(({ usePaginationStore }) => {
                            import('./cache-store').then(({ useCacheStore }) => {
                                const movieStore = useMovieStore.getState();
                                const paginationStore = usePaginationStore.getState();
                                const cacheStore = useCacheStore.getState();

                                paginationStore.resetPagination();
                                cacheStore.invalidateCache();

                                // Clear movies if switching between search and discover
                                if (
                                    (currentQuery === '' && query !== '') ||
                                    (currentQuery !== '' && query === '')
                                ) {
                                    movieStore.clearMovies();
                                }

                                movieStore.fetchMovies();
                            });
                        });
                    });
                }, 0);
            },

            resetFilters: () => {
                set({
                    searchQuery: '',
                    selectedGenres: [],
                    sortBy: 'popularity.desc',
                });
                // Trigger fetch in movie store
                setTimeout(() => {
                    import('./movie-store').then(({ useMovieStore }) => {
                        import('./pagination-store').then(({ usePaginationStore }) => {
                            import('./cache-store').then(({ useCacheStore }) => {
                                const movieStore = useMovieStore.getState();
                                const paginationStore = usePaginationStore.getState();
                                const cacheStore = useCacheStore.getState();

                                paginationStore.resetPagination();
                                cacheStore.invalidateCache();
                                movieStore.fetchMovies();
                            });
                        });
                    });
                }, 0);
            },

            getCurrentFilterParams: () => {
                const { sortBy, selectedGenres, searchQuery } = get();
                return JSON.stringify({
                    sortBy,
                    selectedGenres,
                    searchQuery,
                });
            },
        }),
        {
            name: 'filter-store',
            storage: createJSONStorage(() =>
                typeof window === 'undefined' ? noopStorage : sessionStorage,
            ),
            partialize: (state) => ({
                sortBy: state.sortBy,
                selectedGenres: state.selectedGenres,
                searchQuery: state.searchQuery,
            }),
        },
    ),
);