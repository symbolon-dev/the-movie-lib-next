'use client';

import { useEffect, useState } from 'react';

import { applyDocumentTheme, getSystemThemePreference } from '@/utils/theme';

export const useTheme = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme-mode');
        const systemTheme = getSystemThemePreference();
        const initialTheme = (stored as 'light' | 'dark') || systemTheme;

        setMode(initialTheme);
        setHasHydrated(true);
        applyDocumentTheme(initialTheme);
    }, []);

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
        applyDocumentTheme(newMode);
    };

    const setThemeMode = (newMode: 'light' | 'dark') => {
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
        applyDocumentTheme(newMode);
    };

    return {
        mode,
        hasHydrated,
        toggleMode,
        setMode: setThemeMode,
    };
};
