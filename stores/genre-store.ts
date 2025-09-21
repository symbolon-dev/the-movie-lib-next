import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { handleStoreError } from '@/utils/error-handler/store-error-handler';

export type GenreState = {
    genres: { id: number; name: string }[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    lastFetched: number | undefined;
    fetchGenres: () => Promise<void>;
    getGenres: () => Promise<{ id: number; name: string }[] | undefined>;
    shouldRefetch: () => boolean;
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

export const useGenreStore = create<GenreState>()(
    persist(
        (set, get) => ({
            genres: undefined,
            isLoading: false,
            error: undefined,
            lastFetched: undefined,

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
                        lastFetched: Date.now(),
                    });
                } catch (error) {
                    set({ isLoading: false });
                    handleStoreError(error, 'fetch genres', set);
                }
            },

            getGenres: async (): Promise<{ id: number; name: string }[] | undefined> => {
                const state = get();
                if (state.genres && !state.shouldRefetch()) {
                    return state.genres;
                }
                await get().fetchGenres();
                return get().genres;
            },

            shouldRefetch: (): boolean => {
                const { lastFetched } = get();
                if (!lastFetched) return true;

                const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
                return Date.now() - lastFetched > TWENTY_FOUR_HOURS;
            },
        }),
        {
            name: 'genre-store',
            storage: createJSONStorage(() =>
                typeof window === 'undefined' ? noopStorage : localStorage,
            ),
            partialize: (state) => ({
                genres: state.genres,
                lastFetched: state.lastFetched,
            }),
        },
    ),
);
