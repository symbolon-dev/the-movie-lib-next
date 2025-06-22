'use client';

import { useEffect } from 'react';

import GenreFilter from '@/components/filter/GenreFilter';
import SearchBar from '@/components/filter/SearchBar';
import SortSelect from '@/components/filter/SortSelect';
import MovieList from '@/components/movie/MovieList';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { useMovieStore } from '@/lib/store';

const Home = () => {
    const {
        movies,
        fetchMovies,
        resetFilters,
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
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
                <SearchBar />
                <GenreFilter />
                <SortSelect />

                <Button
                    onClick={() => resetFilters()}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700"
                >
                    Reset Filters
                </Button>
            </div>
            <div className="flex flex-col">
                {error && (
                    <div className="my-4 rounded-md border border-red-500 bg-red-500/10 p-4">
                        <p className="text-sm font-medium text-red-500">{error}</p>
                    </div>
                )}

                <MovieList movies={movies || []} isLoading={isLoading} />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
