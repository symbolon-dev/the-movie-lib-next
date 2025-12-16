'use client';

import { motion } from 'motion/react';
import { useEffect, useEffectEvent, useRef } from 'react';

import { ToTopFab } from '@/components/layout/to-top-fab';
import { ErrorMessage } from '@/components/shared/error-message';
import { useMovies } from '@/hooks/use-movies';

import { MovieList } from './movie-list';

export const MovieResults = () => {
    const {
        movies,
        isLoading,
        error,
        currentPage,
        totalPages,
        loadMoreMovies,
        mutate,
    } = useMovies();

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const hasMorePages = currentPage < totalPages;

    const handleIntersection = useEffectEvent(
        (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && !isLoading && hasMorePages) {
                loadMoreMovies();
            }
        },
    );

    useEffect(() => {
        if (!sentinelRef.current)
            return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    handleIntersection(entry);
                }
            },
            { rootMargin: '200px 0px' },
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {error
                ? (
                        <ErrorMessage
                            error={error}
                            onRetry={() => {
                                void mutate();
                            }}
                        />
                    )
                : null}

            <MovieList
                movies={movies}
                isLoading={isLoading ? currentPage === 1 : undefined}
            />

            <div
                ref={sentinelRef}
                className="-mt-32 mb-8 flex min-h-12 items-center justify-center"
            >
                {hasMorePages && isLoading && currentPage > 1
                    ? (
                            <div className="text-muted-foreground flex items-center gap-3 text-sm">
                                <motion.span
                                    className="border-muted border-t-primary inline-block size-7 rounded-full border-2"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        ease: 'linear',
                                        duration: 0.8,
                                    }}
                                >
                                    <span className="sr-only">Loading</span>
                                </motion.span>
                                <span>Loading more movies…</span>
                            </div>
                        )
                    : null}
            </div>

            <ToTopFab />
        </div>
    );
};
