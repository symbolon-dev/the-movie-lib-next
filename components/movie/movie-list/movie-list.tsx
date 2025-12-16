'use client';

import type { Movie } from '@/types/movie';

import { useEffect, useEffectEvent, useRef } from 'react';
import { MovieCard } from '@/components/movie/movie-card/movie-card';
import { MovieListSkeleton } from '@/components/movie/movie-list/movie-list-skeleton';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';

type MovieListProps = {
    movies: Movie[];
    className?: string;
    isLoading?: boolean;
};

export const MovieList = ({
    movies,
    className = '',
    isLoading = false,
}: MovieListProps) => {
    const scrollRef = useRef(0);

    const handleScroll = useEffectEvent(() => {
        scrollRef.current = window.scrollY;
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => window.scrollTo(0, scrollRef.current));
    }, []);

    if (isLoading) {
        return <MovieListSkeleton count={12} className={className} />;
    }

    if (movies.length === 0) {
        return (
            <div className={className}>
                <EmptyState
                    title="No movies found"
                    message="Try different search criteria or filters."
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                `
                    grid grid-cols-1 gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                `,
                className,
            )}
        >
            {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} priority={index < 4} />
            ))}
        </div>
    );
};
