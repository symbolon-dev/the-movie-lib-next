'use client';

import { useEffect, useRef } from 'react';
import { Moon, SunDim } from 'lucide-react';
import { flushSync } from 'react-dom';
import { Button } from '@/components/ui/button';
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
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
            },
            {
                duration: 700,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            },
        );
    };

    const isDark = mode === 'dark';

    return (
        <Button
            ref={buttonRef}
            onClick={changeTheme}
            variant="outline"
            size="icon"
            className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-12 ${className}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <SunDim className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
    );
};
