'use client';

import { useEffect, useRef } from 'react';
import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';
import { LoadingSpinner } from '@/components/common/loading/LoadingSpinner';
import { BackToTopFab } from '@/components/common/navigation/BackToTopFab';
import { useMovieStore } from '@/stores/movie-store';
import { MovieList } from './MovieList';

export const MovieResults = () => {
    const {
        movies,
        currentPage,
        totalPages,
        isLoading,
        error,
        loadMoreMovies,
        hasMoviesForCurrentParams,
        fetchMovies,
    } = useMovieStore();

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMoviesForCurrentParams()) {
            fetchMovies();
        }
    }, [hasMoviesForCurrentParams, fetchMovies]);

    const hasMorePages = currentPage < totalPages;

    useEffect(() => {
        if (!hasMorePages) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry?.isIntersecting) return;

                if (!isLoading) {
                    void loadMoreMovies();
                }
            },
            {
                // Trigger loading slightly before the sentinel is fully visible
                rootMargin: '200px 0px',
                threshold: 0.1,
            },
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [hasMorePages, isLoading, loadMoreMovies]);

    return (
        <div className="flex flex-col gap-6">
            {error && <ErrorMessage error={error} />}

            <MovieList
                movies={movies ?? []}
                isLoading={
                    (isLoading && currentPage === 1) || (!movies && !hasMoviesForCurrentParams())
                }
            />

            <div
                ref={sentinelRef}
                className="my-8 flex min-h-[3rem] items-center justify-center"
                aria-live="polite"
            >
                {hasMorePages && isLoading && currentPage > 1 && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        <LoadingSpinner size={28} />
                        <span>Loading more movies…</span>
                    </div>
                )}
            </div>

            <BackToTopFab />
        </div>
    );
};
