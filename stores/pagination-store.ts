import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PaginationState = {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    setPage: (page: number) => void;
    setPaginationData: (totalPages: number, totalResults: number) => void;
    resetPagination: () => void;
    canLoadMore: () => boolean;
    getNextPage: () => number;
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

export const usePaginationStore = create<PaginationState>()(
    persist(
        (set, get) => ({
            currentPage: 1,
            totalPages: 0,
            totalResults: 0,

            setPage: (page: number) => {
                set({ currentPage: page });
            },

            setPaginationData: (totalPages: number, totalResults: number) => {
                set({ totalPages, totalResults });
            },

            resetPagination: () => {
                set({
                    currentPage: 1,
                    totalPages: 0,
                    totalResults: 0,
                });
            },

            canLoadMore: () => {
                const { currentPage, totalPages } = get();
                return currentPage < totalPages;
            },

            getNextPage: () => {
                const { currentPage, totalPages } = get();
                return currentPage < totalPages ? currentPage + 1 : currentPage;
            },
        }),
        {
            name: 'pagination-store',
            storage: createJSONStorage(() =>
                typeof window === 'undefined' ? noopStorage : sessionStorage,
            ),
            partialize: (state) => ({
                currentPage: state.currentPage,
                totalPages: state.totalPages,
                totalResults: state.totalResults,
            }),
        },
    ),
);
