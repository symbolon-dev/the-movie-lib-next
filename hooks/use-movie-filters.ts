'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { MovieSortOption } from '@/types/movie';

export const useMovieFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get('q') || '';
    const sortBy = (searchParams.get('sort') as MovieSortOption) || 'popularity.desc';
    const selectedGenres = searchParams.get('genres')?.split(',').map(Number).filter(Boolean) || [];

    const updateFilters = useCallback(
        (updates: {
            searchQuery?: string;
            sortBy?: MovieSortOption;
            selectedGenres?: number[];
        }) => {
            const newParams = new URLSearchParams(searchParams.toString());

            if (updates.searchQuery !== undefined) {
                if (updates.searchQuery.trim()) {
                    newParams.set('q', updates.searchQuery.trim());
                } else {
                    newParams.delete('q');
                }
            }

            if (updates.sortBy !== undefined) {
                newParams.set('sort', updates.sortBy);
            }

            if (updates.selectedGenres !== undefined) {
                if (updates.selectedGenres.length > 0) {
                    newParams.set('genres', updates.selectedGenres.join(','));
                } else {
                    newParams.delete('genres');
                }
            }

            const url = newParams.toString() ? `${pathname}?${newParams.toString()}` : pathname;
            router.replace(url, { scroll: false });
        },
        [searchParams, router, pathname],
    );

    const resetFilters = useCallback(() => {
        router.push(pathname);
    }, [router, pathname]);

    const hasActiveFilters =
        searchQuery.trim() !== '' || selectedGenres.length > 0 || sortBy !== 'popularity.desc';

    return {
        searchQuery,
        sortBy,
        selectedGenres,
        hasActiveFilters,
        updateFilters,
        resetFilters,
        setSearchQuery: (query: string) => updateFilters({ searchQuery: query }),
        setSortBy: (sort: MovieSortOption) => updateFilters({ sortBy: sort }),
        setSelectedGenres: (genres: number[]) => updateFilters({ selectedGenres: genres }),
    };
};
