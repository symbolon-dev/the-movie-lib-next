'use client';

import { Moon, SunDim } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme-store';

type AnimatedThemeToggleProps = {
    className?: string;
};

export const AnimatedThemeToggle = ({ className }: AnimatedThemeToggleProps) => {
    const { mode, toggleMode } = useThemeStore();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    const changeTheme = async () => {
        if (!buttonRef.current) return;

        // Check if View Transition API is supported
        if (!document.startViewTransition) {
            toggleMode();
            return;
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                toggleMode();
            });
        }).ready;

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRad}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 700,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        );
    };

    const isDark = mode === 'dark';

    return (
        <button
            ref={buttonRef}
            onClick={changeTheme}
            className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-primary/10 hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                className
            )}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <SunDim className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
};