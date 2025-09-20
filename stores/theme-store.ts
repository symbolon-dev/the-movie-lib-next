import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeState = {
    mode: 'light' | 'dark';
    toggleMode: () => void;
    setMode: (mode: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            mode: 'dark',

            toggleMode: () =>
                set((state) => ({
                    mode: state.mode === 'light' ? 'dark' : 'light',
                })),

            setMode: (mode) => set({ mode }),
        }),
        {
            name: 'theme-store',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
