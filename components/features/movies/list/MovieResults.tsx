'use client';

import { useEffect } from 'react';

import MovieList from '@/components/features/movies/list/MovieList';
import ErrorMessage from '@/components/shared/common/ErrorMessage';
import Pagination from '@/components/shared/common/Pagination';
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
