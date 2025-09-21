'use client';

import { useEffect } from 'react';
import { MovieFilter } from '@/components/movie/filter/MovieFilter';
import { MovieFilterSkeleton } from '@/components/skeleton/filter/MovieFilterSkeleton';
import { useMovieStore } from '@/stores/movie-store';

export const MovieFilterWithSkeleton = () => {
    const { genres, getGenres } = useMovieStore();

    useEffect(() => {
        if (!genres) {
            getGenres();
        }
    }, [genres, getGenres]);

    // Show skeleton until genres are loaded
    if (!genres) {
        return <MovieFilterSkeleton />;
    }

    return <MovieFilter />;
};
