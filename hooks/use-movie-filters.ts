'use client';

import type { MovieSortOption } from '@/types/movie';

import { createParser, parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { MovieSortOptionSchema } from '@/schemas/api-params';

const parseAsMovieSortOption = createParser({
    parse: (value: string) => {
        const result = MovieSortOptionSchema.safeParse(value);
        return result.success ? result.data : null;
    },
    serialize: (value: MovieSortOption) => value,
});

export const useMovieFilters = () => {
    const [searchQuery, setSearchQuery] = useQueryState(
        'q',
        parseAsString.withDefault(''),
    );

    const [sortBy, setSortBy] = useQueryState(
        'sort',
        parseAsMovieSortOption.withDefault('popularity.desc'),
    );

    const [selectedGenres, setSelectedGenres] = useQueryState(
        'genres',
        parseAsArrayOf(parseAsInteger).withDefault([]),
    );

    const updateFilters = (updates: {
        searchQuery?: string;
        sortBy?: MovieSortOption;
        selectedGenres?: number[];
    }) => {
        if (updates.searchQuery !== undefined) {
            void setSearchQuery(updates.searchQuery.trim() || null);
        }

        if (updates.sortBy !== undefined) {
            void setSortBy(updates.sortBy);
        }

        if (updates.selectedGenres !== undefined) {
            void setSelectedGenres(
                updates.selectedGenres.length > 0 ? updates.selectedGenres : null,
            );
        }
    };

    const resetFilters = () => {
        void setSearchQuery(null);
        void setSortBy('popularity.desc');
        void setSelectedGenres(null);
    };

    const hasActiveFilters
        = searchQuery.trim() !== ''
            || selectedGenres.length > 0
            || sortBy !== 'popularity.desc';

    return {
        searchQuery,
        sortBy,
        selectedGenres,
        hasActiveFilters,
        updateFilters,
        resetFilters,
        setSearchQuery,
        setSortBy,
        setSelectedGenres,
    };
};
