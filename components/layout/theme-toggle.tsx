'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { AnimatedThemeToggler, ThemeMode } from '@/components/ui/animated-theme-toggler';

type ThemeToggleProps = {
    className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
    const { setTheme, resolvedTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleMode = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const changeTheme = async () => {
        if (!buttonRef.current || isTransitioning) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const startViewTransition = document.startViewTransition?.bind(document);

        if (!startViewTransition || prefersReducedMotion) {
            toggleMode();
            return;
        }

        setIsTransitioning(true);

        try {
            await startViewTransition(() => {
                flushSync(() => {
                    toggleMode();
                });
            }).ready;
        } catch (error) {
            console.error('Theme view transition failed', error);
            setIsTransitioning(false);
            toggleMode();
            return;
        }

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        const animation = document.documentElement.animate(
            {
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
            },
            {
                duration: 700,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            },
        );

        const handleTransitionComplete = () => {
            setIsTransitioning(false);
        };

        animation.addEventListener('finish', handleTransitionComplete, { once: true });
        animation.addEventListener('cancel', handleTransitionComplete, { once: true });
    };

    return (
        <AnimatedThemeToggler
            ref={buttonRef}
            onToggle={changeTheme}
            mode={resolvedTheme as ThemeMode}
            className={className}
            disabled={!resolvedTheme}
            isTransitioning={isTransitioning}
        />
    );
};
