'use client';

import { GenreFilter } from '@/components/movie/filter/GenreFilter';
import { SearchBar } from '@/components/movie/filter/SearchBar';
import { SortSelect } from '@/components/movie/filter/SortSelect';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/stores/movie-store';

export const MovieFilter = () => {
    const { resetFilters } = useMovieStore();

    return (
        <div className="space-y-6">
            <SearchBar />
            <GenreFilter />
            <SortSelect />

            <Button onClick={() => resetFilters()} variant="destructive" className="mt-4 w-full">
                Reset Filters
            </Button>
        </div>
    );
};
