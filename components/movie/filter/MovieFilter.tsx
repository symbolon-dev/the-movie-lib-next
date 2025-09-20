'use client';

import { GenreFilter } from '@/components/movie/filter/GenreFilter';
import { SearchBar } from '@/components/movie/filter/SearchBar';
import { SortSelect } from '@/components/movie/filter/SortSelect';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/ui/magic-card';
import { useMovieStore } from '@/stores/movie-store';

export const MovieFilter = () => {
    const { resetFilters, searchQuery, selectedGenres, sortBy } = useMovieStore();

    const hasActiveFilters =
        searchQuery.trim() !== '' || selectedGenres.length > 0 || sortBy !== 'popularity.desc';

    return (
        <MagicCard gradientColor="#61DAFB55" className="p-6 h-fit">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Search & Filter</h2>
                    <SearchBar />
                </div>

                <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Genres</h3>
                    <GenreFilter />
                </div>

                <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Sort By</h3>
                    <SortSelect />
                </div>

                <div className="border-t border-border pt-4">
                    <Button
                        onClick={() => resetFilters()}
                        variant="outline"
                        className="w-full"
                        disabled={!hasActiveFilters}
                    >
                        Reset All Filters
                    </Button>
                </div>
            </div>
        </MagicCard>
    );
};
