'use client'

import { useMovieStore } from '@/lib/store';
import { useEffect } from 'react';

const Home = () => {
    const { movies, discoverMovies } = useMovieStore();

    useEffect(() => {
        discoverMovies()
    }, [])

    return (
        <>
            <h1>Discover Movies</h1>
            <div>
                {movies?.results?.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
