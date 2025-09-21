'use client';

import { useEffect, useRef } from 'react';
import { Moon, SunDim } from 'lucide-react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme-store';

type props = {
    className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
    const { mode, toggleMode } = useThemeStore();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Sync DOM class with store on mount and mode changes
    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    const changeTheme = async () => {
        if (!buttonRef.current) return;

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
    return (
        <button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
            {mode === 'dark' ? <SunDim /> : <Moon />}
        </button>
    );
};
