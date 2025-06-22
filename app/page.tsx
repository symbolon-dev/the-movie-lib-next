'use client';

import GenreFilter from '@/components/filter/GenreFilter';
import SearchBar from '@/components/filter/SearchBar';
import SortSelect from '@/components/filter/SortSelect';
import MovieList from '@/components/movie/MovieList';
import Button from '@/components/ui/Button';
import { useMovieStore } from '@/lib/store';
import { useEffect } from 'react';

const Home = () => {
    const { movies, fetchMovies, resetFilters } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className='grid grid-cols-[300px_1fr] gap-6 my-8'>
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
            <MovieList
                movies={movies || []}
            />
        </div>
    );
};

export default Home;
