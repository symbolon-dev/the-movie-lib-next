'use client';

import { useEffect } from 'react';

import { Moon, Sun } from 'lucide-react';

import { useThemeStore } from '@/lib/theme';

const ThemeToggle = () => {
    const { mode, toggleMode } = useThemeStore();

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    return (
        <button
            onClick={toggleMode}
            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {mode === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    );
};

export default ThemeToggle;
