'use client';

import React, { useEffect } from 'react';

import MovieList from '@/components/movie/MovieList';
import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import { useMovieStore } from '@/lib/store';

const MovieResults = () => {
    const {
        movies,
        fetchMovies,
        currentPage,
        totalPages,
        setPage,
        isLoading,
        error,
    } = useMovieStore();

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

export default MovieResults;
