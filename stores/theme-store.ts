import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { applyDocumentTheme, getSystemThemePreference } from '@/utils/theme';

type ThemeState = {
    mode: 'light' | 'dark';
    hasHydrated: boolean;
    toggleMode: () => void;
    setMode: (mode: 'light' | 'dark') => void;
};

let storeSet: ((state: Partial<ThemeState>) => void) | undefined;

const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => {
            storeSet = set;

            return {
                mode: 'light',
                hasHydrated: false,

                toggleMode: () => {
                    const nextMode = get().mode === 'light' ? 'dark' : 'light';
                    set({ mode: nextMode });
                    applyDocumentTheme(nextMode);
                },

                setMode: (mode) => {
                    set({ mode });
                    applyDocumentTheme(mode);
                },
            };
        },
        {
            name: 'theme-store',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state, error) => {
                const fallback = getSystemThemePreference();

                if (error) {
                    applyDocumentTheme(fallback);
                    storeSet?.({ mode: fallback, hasHydrated: true });
                    return;
                }

                const persistedMode = state?.mode ?? fallback;
                applyDocumentTheme(persistedMode);
                storeSet?.({ mode: persistedMode, hasHydrated: true });
            },
        },
    ),
);

export { useThemeStore };
