import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { handleStoreError } from '@/utils/error-handler/store-error-handler';

export type GenreState = {
    genres: { id: number; name: string }[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    fetchGenres: () => Promise<void>;
    getGenres: () => Promise<{ id: number; name: string }[] | undefined>;
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
                    set({ isLoading: false });
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
        }),
        {
            name: 'genre-store',
            storage: createJSONStorage(() =>
                typeof window === 'undefined' ? noopStorage : sessionStorage,
            ),
            partialize: (state) => ({
                genres: state.genres,
            }),
        },
    ),
);