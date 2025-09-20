'use client';

import { useEffect } from 'react';
import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';
import { Pagination } from '@/components/common/navigation/Pagination';
import { useMovieStore } from '@/stores/movie-store';
import { MovieList } from './MovieList';

export const MovieResults = () => {
    const { movies, fetchMovies, currentPage, totalPages, setPage, isLoading, error } =
        useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className="flex flex-col">
            {error && <ErrorMessage error={error} />}

            <MovieList movies={movies ?? []} isLoading={isLoading} />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};
