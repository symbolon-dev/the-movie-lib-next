'use client';

import { useEffect, useRef } from 'react';

import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';
import { LoadingSpinner } from '@/components/common/loading/LoadingSpinner';
import { BackToTopFab } from '@/components/common/navigation/BackToTopFab';
import { useMovieStore } from '@/stores/movie-store';
import { usePaginationStore } from '@/stores/pagination-store';

import { MovieList } from './MovieList';

const MovieResults = () => {
    const { movies, isLoading, error, loadMoreMovies, hasMoviesForCurrentParams, fetchMovies } =
        useMovieStore();
    const { currentPage, totalPages } = usePaginationStore();

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
        if (!hasMoviesForCurrentParams()) {
            fetchMovies();
        }
    }, [hasMoviesForCurrentParams, fetchMovies]);

    useEffect(() => {
        if (!hasMorePages || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry?.isIntersecting && !isLoading) {
                    void loadMoreMovies();
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
                        fetchMovies();
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
                        <LoadingSpinner size={28} />
                        <span>Loading more movies…</span>
                    </div>
                )}
            </div>

            <BackToTopFab />
        </div>
    );
};

export { MovieResults };
