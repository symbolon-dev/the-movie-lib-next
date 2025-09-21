import { create } from 'zustand';

export type CacheState = {
    lastFetchParams: string | undefined;
    abortController: AbortController | undefined;
    hasValidCache: (currentParams: string) => boolean;
    setLastFetchParams: (params: string) => void;
    setAbortController: (controller: AbortController | undefined) => void;
    invalidateCache: () => void;
    abortCurrentRequest: () => void;
};

export const useCacheStore = create<CacheState>((set, get) => ({
    lastFetchParams: undefined,
    abortController: undefined,

    hasValidCache: (currentParams: string) => {
        const { lastFetchParams } = get();
        return lastFetchParams === currentParams;
    },

    setLastFetchParams: (params: string) => {
        set({ lastFetchParams: params });
    },

    setAbortController: (controller: AbortController | undefined) => {
        set({ abortController: controller });
    },

    invalidateCache: () => {
        set({ lastFetchParams: undefined });
    },

    abortCurrentRequest: () => {
        const { abortController } = get();
        if (abortController) {
            abortController.abort();
            set({ abortController: undefined });
        }
    },
}));
