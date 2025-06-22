'use client';

import { useThemeStore } from '@/lib/theme';
import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { mode, toggleMode } = useThemeStore();

    useEffect(() => {
        mode === 'dark'
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }, [mode]);

    return (
        <button
            onClick={toggleMode}
            className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {mode === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    );
}

export default ThemeToggle;
