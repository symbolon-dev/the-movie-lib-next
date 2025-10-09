'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { ToTopFab } from '@/components/layout/to-top-fab';
import { ErrorMessage } from '@/components/shared/error-message';
import { useMovies } from '@/hooks/use-movies';

import { MovieList } from './movie-list';

export const MovieResults = () => {
    const { movies, isLoading, error, currentPage, totalPages, loadMoreMovies, mutate } =
        useMovies();

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const hasMorePages = currentPage < totalPages;

    useEffect(() => {
        const cameFromMovieDetail = sessionStorage.getItem('navigated-from-movie-list');
        const savedScroll = sessionStorage.getItem('movie-list-scroll-position');

        if (cameFromMovieDetail && savedScroll && movies && movies.length > 0) {
            const scrollY = Number(savedScroll);
            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollY, behavior: 'instant' });
            });
            sessionStorage.removeItem('movie-list-scroll-position');
            sessionStorage.removeItem('navigated-from-movie-list');
        }
    }, [movies]);

    useEffect(() => {
        if (!hasMorePages || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry?.isIntersecting && !isLoading) {
                    loadMoreMovies();
                }
            },
            { rootMargin: '200px 0px' },
        );

        observer.observe(sentinelRef.current);

        return () => observer.disconnect();
    }, [hasMorePages, isLoading, loadMoreMovies]);

    return (
        <div className="flex flex-col gap-6">
            {error && (
                <ErrorMessage
                    error={error}
                    onRetry={() => {
                        mutate();
                    }}
                />
            )}

            <MovieList movies={movies || []} isLoading={isLoading && currentPage === 1} />

            <div
                ref={sentinelRef}
                className="-mt-32 mb-8 flex min-h-[3rem] items-center justify-center"
                aria-live="polite"
            >
                {hasMorePages && isLoading && currentPage > 1 && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        <motion.span
                            role="status"
                            aria-label="Loading"
                            className="border-muted border-t-primary inline-block size-7 rounded-full border-2"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, ease: 'linear', duration: 0.8 }}
                        >
                            <span className="sr-only">Loading</span>
                        </motion.span>
                        <span>Loading more movies…</span>
                    </div>
                )}
            </div>

            <ToTopFab />
        </div>
    );
};
