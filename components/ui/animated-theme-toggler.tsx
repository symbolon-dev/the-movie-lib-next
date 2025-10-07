'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, SunDim } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

export type ThemeMode = 'light' | 'dark';

type AnimatedThemeTogglerProps = {
    mode: ThemeMode;
    onToggle: () => void;
    className?: string;
    disabled?: boolean;
    isTransitioning?: boolean;
} & React.ComponentProps<'button'>;

const iconTransition = {
    duration: 0.28,
    ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
};

const AnimatedThemeToggler = ({
    mode,
    onToggle,
    className,
    disabled = false,
    isTransitioning = false,
    ...props
}: AnimatedThemeTogglerProps) => {
    const isDark = mode === 'dark';

    return (
        <button
            type="button"
            onClick={onToggle}
            className={cn(
                'group border-border/70 bg-background/90 text-foreground shadow-primary/10 hover:border-primary/70 hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-0.5 shadow-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
                isTransitioning && 'cursor-wait',
                className,
            )}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-live="polite"
            aria-pressed={isDark}
            disabled={disabled || isTransitioning}
            data-transitioning={isTransitioning ? 'true' : 'false'}
            {...props}
        >
            <span className="from-primary/40 to-secondary/40 absolute inset-[-40%] rounded-full bg-gradient-to-br via-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

            <span className="bg-background/80 relative flex h-full w-full items-center justify-center rounded-full backdrop-blur-sm">
                <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                        <motion.span
                            key="sun"
                            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                            transition={iconTransition}
                            className="text-foreground"
                        >
                            <SunDim className="h-5 w-5" aria-hidden="true" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="moon"
                            initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
                            transition={iconTransition}
                            className="text-foreground"
                        >
                            <Moon className="h-5 w-5" aria-hidden="true" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>

            <span className="sr-only">
                {isDark ? 'Currently dark mode' : 'Currently light mode'}
            </span>
        </button>
    );
};

AnimatedThemeToggler.displayName = 'AnimatedThemeToggler';

export { AnimatedThemeToggler };
