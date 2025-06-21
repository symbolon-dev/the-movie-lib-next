'use client';

import { useMovieStore } from '@/lib/store';
import { MovieDetail } from '@/types/movie';
import React, { useEffect, useState } from 'react';

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const [movie, setMovie] = useState<MovieDetail | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { fetchMovieDetails, isLoading: storeLoading } = useMovieStore();

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const movieData = await fetchMovieDetails(id);
                setMovie(movieData);
            } catch (error) {
                console.error('Error loading movie:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMovie();
    }, [id, fetchMovieDetails]);

    if (isLoading || storeLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl">Loading movie data...</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl text-red-500">Could not load movie.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Movie Details</h1>
            <p>Movie ID: {id}</p>
            <div>
                <h2>Title: {movie.title}</h2>
                <p>Overview: {movie.overview}</p>
            </div>
        </div>
    );
};

export default Detail;
