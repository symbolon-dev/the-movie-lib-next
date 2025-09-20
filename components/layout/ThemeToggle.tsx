'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useThemeStore } from '@/stores/theme-store';

export const ThemeToggle = () => {
    const { mode, toggleMode } = useThemeStore();

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    return (
        <Toggle
            pressed={mode === 'dark'}
            onPressedChange={toggleMode}
            variant="outline"
            size="default"
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {mode === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Toggle>
    );
};
