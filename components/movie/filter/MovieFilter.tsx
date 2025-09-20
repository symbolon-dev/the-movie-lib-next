'use client';

import { GenreFilter, SearchBar, SortSelect } from '@/components/movie';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/lib/store';

const MovieFilter = () => {
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

export default MovieFilter;
