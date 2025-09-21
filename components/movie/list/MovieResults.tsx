'use client';

import { useEffect } from 'react';
import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';
import { Button } from '@/components/ui/button';
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

    useEffect(() => {
        if (!hasMoviesForCurrentParams()) {
            fetchMovies();
        }
    }, [hasMoviesForCurrentParams, fetchMovies]);

    const hasMorePages = currentPage < totalPages;

    return (
        <div className="flex flex-col">
            {error && <ErrorMessage error={error} />}

            <MovieList
                movies={movies ?? []}
                isLoading={
                    (isLoading && currentPage === 1) || (!movies && !hasMoviesForCurrentParams())
                }
            />

            {hasMorePages && (
                <div className="my-8 flex justify-center">
                    <Button
                        onClick={loadMoreMovies}
                        disabled={isLoading}
                        variant="outline"
                        size="lg"
                        animationType="subtle"
                    >
                        {isLoading ? 'Loading...' : 'Load More Movies'}
                    </Button>
                </div>
            )}
        </div>
    );
};
