'use client';

import type { MovieGenre } from '@/types/movie';
import { GenreFilter } from '@/components/movie/movie-filter/genre-filter';
import { SearchBar } from '@/components/movie/movie-filter/search-bar';
import { SortSelect } from '@/components/movie/movie-filter/sort-select';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/ui/magic-card';
import { useMovieFilters } from '@/hooks/use-movie-filters';

type MovieFilterProps = {
    genres: MovieGenre[];
};

export const MovieFilter = ({ genres }: MovieFilterProps) => {
    const { resetFilters, hasActiveFilters } = useMovieFilters();

    return (
        <MagicCard gradientColor="var(--color-primary)" className="h-fit p-6">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="heading-4">Search & Filter</h2>
                    <SearchBar />
                </div>

                <div className="border-border border-t pt-4">
                    <h3 className="text-body-sm text-muted-foreground mb-3 font-medium">
                        Genres
                    </h3>
                    <GenreFilter genres={genres} />
                </div>

                <div className="border-border border-t pt-4">
                    <h3 className="text-body-sm text-muted-foreground mb-3 font-medium">
                        Sort By
                    </h3>
                    <SortSelect />
                </div>

                <div className="border-border border-t pt-4">
                    <Button
                        onClick={() => resetFilters()}
                        variant="outline"
                        className="w-full"
                        animationType="subtle"
                        disabled={!hasActiveFilters}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>
        </MagicCard>
    );
};
