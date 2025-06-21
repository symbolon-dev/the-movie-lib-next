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
                {movies?.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <button 
                            onClick={() => window.location.href = `/movies/${movie.id}`}
                            className='cursor-pointer'    
                        >
                            View Details
                        </button>
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
