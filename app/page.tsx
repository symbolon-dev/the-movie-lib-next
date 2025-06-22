'use client';

import GenreFilter from '@/components/filter/GenreFilter';
import SearchBar from '@/components/filter/SearchBar';
import SortSelect from '@/components/filter/SortSelect';
import MovieList from '@/components/movie/MovieList';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { useMovieStore } from '@/lib/store';
import { useEffect } from 'react';

const Home = () => {
    const {
        movies,
        fetchMovies,
        resetFilters,
        currentPage,
        totalPages,
        setPage,
        isLoading,
        error
    } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 my-8'>
            <div className='space-y-6'>
                <SearchBar />
                <GenreFilter />
                <SortSelect />

                <Button
                    onClick={() => resetFilters()}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700"
                >
                    Reset Filters
                </Button>
            </div>
            <div className='flex flex-col'>
                {error && (
                    <div className="bg-red-500/10 border border-red-500 rounded-md p-4 my-4">
                        <p className="text-sm font-medium text-red-500">{error}</p>
                    </div>
                )}

                <MovieList
                    movies={movies || []}
                    isLoading={isLoading}
                />

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
