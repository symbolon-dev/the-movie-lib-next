import { ThemeMode } from '@/components/ui/animated-theme-toggler';

const applyDocumentTheme = (mode: ThemeMode) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.classList.toggle('light', mode === 'light');
    root.dataset.theme = mode;
};

const getSystemThemePreference = () => {
    if (typeof window === 'undefined') return 'light' as const;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export { applyDocumentTheme, getSystemThemePreference };
