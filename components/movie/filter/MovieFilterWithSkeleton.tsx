'use client';

import { useEffect } from 'react';
import { MovieFilter } from '@/components/movie/filter/MovieFilter';
import { MovieFilterSkeleton } from '@/components/skeleton/filter/MovieFilterSkeleton';
import { useGenreStore } from '@/stores/genre-store';

const MovieFilterWithSkeleton = () => {
    const { genres, getGenres } = useGenreStore();

    useEffect(() => {
        if (!genres) {
            getGenres();
        }
    }, [genres, getGenres]);

    if (!genres) {
        return <MovieFilterSkeleton />;
    }

    return <MovieFilter />;
};

export { MovieFilterWithSkeleton };
