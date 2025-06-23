'use client';

import GenreFilter from '@/components/features/movies/filter/GenreFilter';
import SearchBar from '@/components/features/movies/filter/SearchBar';
import SortSelect from '@/components/features/movies/filter/SortSelect';
import Button from '@/components/shared/ui/Button';
import { useMovieStore } from '@/lib/store';

const MovieFilter = () => {
    const { resetFilters } = useMovieStore();

    return (
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
    );
};

export default MovieFilter;
