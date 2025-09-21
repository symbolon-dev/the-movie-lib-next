'use client';

import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, SunDim } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ThemeMode = 'light' | 'dark';

type AnimatedThemeTogglerProps = {
    mode: ThemeMode;
    onToggle: () => void;
    className?: string;
    disabled?: boolean;
    isTransitioning?: boolean;
};

const iconTransition = {
    duration: 0.28,
    ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
};

const AnimatedThemeToggler = forwardRef<HTMLButtonElement, AnimatedThemeTogglerProps>(
({ mode, onToggle, className, disabled = false, isTransitioning = false }, ref) => {
    const isDark = mode === 'dark';

    return (
        <button
            type="button"
            onClick={onToggle}
            className={cn(
                'group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/90 p-0.5 text-foreground shadow-lg shadow-primary/10 transition-colors duration-300 hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60',
                isTransitioning && 'cursor-wait',
                className,
            )}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-live="polite"
            aria-pressed={isDark}
            disabled={disabled || isTransitioning}
            data-transitioning={isTransitioning ? 'true' : 'false'}
            ref={ref}
        >
            <span className="absolute inset-[-40%] rounded-full bg-gradient-to-br from-primary/40 via-transparent to-secondary/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
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

            <span className="sr-only">{isDark ? 'Currently dark mode' : 'Currently light mode'}</span>
        </button>
    );
});

AnimatedThemeToggler.displayName = 'AnimatedThemeToggler';

export { AnimatedThemeToggler };
