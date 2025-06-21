'use client';

import MovieList from '@/components/movie/MovieList';
import { useMovieStore } from '@/lib/store';
import { useEffect } from 'react';

const Home = () => {
    const { movies, discoverMovies } = useMovieStore();

    useEffect(() => {
        discoverMovies();
    }, []);

    return (
        <MovieList 
            movies={ movies || [] } 
            className="my-8"
        />
    );
};

export default Home;
