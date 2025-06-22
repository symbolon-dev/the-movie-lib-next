'use client';

import { useMovieStore } from '@/lib/store';
import { MovieDetail } from '@/types/movie';
import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Info, Film, DollarSign } from 'lucide-react';
import dayjs from 'dayjs';

const formatReleaseDate = (date: string): string => {
    return dayjs(date).format('MMM D, YYYY');
};

const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
};

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [movie, setMovie] = useState<MovieDetail | undefined>(undefined);
    const { fetchMovieDetails, isLoading } = useMovieStore();

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const movieData = await fetchMovieDetails(id);
                setMovie(movieData);
            } catch (error) {
                console.error('Error loading movie:', error);
            }
        };

        loadMovie();
    }, [id, fetchMovieDetails]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-xl text-white">Loading movie data...</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center shadow-xl">
                    <Info className="h-16 w-16 mx-auto mb-4 text-red-500" />
                    <h2 className="text-2xl font-bold text-white mb-2">Could not load movie</h2>
                    <p className="text-gray-300 mb-6">There was an error loading the movie data.</p>
                    <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block transition-colors">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 px-4 md:px-8">
            <div className="container mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Movies</span>
                </Link>

                <div className="relative mb-10 rounded-xl overflow-hidden h-[40vh] md:h-[50vh]">
                    {movie.backdrop_path ? (
                        <div className="absolute inset-0">
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80"></div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gray-800"></div>
                    )}
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-xl text-gray-300 italic mb-4">"{movie.tagline}"</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                            {movie.poster_path ? (
                                <div className="relative aspect-[2/3]">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={`${movie.title} poster`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-700 aspect-[2/3] flex items-center justify-center">
                                    <Film className="w-16 h-16 text-gray-500" />
                                    <span className="text-gray-400">No poster available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 text-white">
                        <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center">
                                <div
                                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${movie.vote_average >= 7
                                            ? 'border-green-500'
                                            : movie.vote_average >= 5
                                                ? 'border-yellow-500'
                                                : 'border-red-500'
                                        }`}
                                >
                                    <span className="font-bold text-lg text-white">{movie.vote_average.toFixed(1)}</span>
                                </div>
                                <span className="ml-2 text-sm text-gray-400">({movie.vote_count} votes)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-300">Release: </span>
                                <span>{formatReleaseDate(movie.release_date)}</span>
                            </div>

                            {movie.runtime > 0 && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{formatRuntime(movie.runtime)}</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-gray-200">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {movie.production_companies.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Production</h3>
                                    <div className="text-gray-400">
                                        {movie.production_companies.map(company => company.name).join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.production_countries.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Countries</h3>
                                    <div className="text-gray-400">
                                        {movie.production_countries.map(country => country.name).join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.spoken_languages.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Languages</h3>
                                    <div className="text-gray-400">
                                        {movie.spoken_languages.map(lang => lang.name).join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.budget > 0 && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-gray-200">
                                        <DollarSign className="h-4 w-4" />
                                        Budget
                                    </h3>
                                    <div className="text-gray-400">
                                        ${movie.budget.toLocaleString('en-US')}
                                    </div>
                                </div>
                            )}

                            {movie.revenue > 0 && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-gray-200">
                                        <DollarSign className="h-4 w-4" />
                                        Revenue
                                    </h3>
                                    <div className="text-gray-400">
                                        ${movie.revenue.toLocaleString('en-US')}
                                    </div>
                                </div>
                            )}
                        </div>

                        {(movie.homepage || movie.imdb_id) && (
                            <div className="mt-8">
                                <div className="flex gap-3">
                                    {movie.homepage && (
                                        <a
                                            href={movie.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                        >
                                            Official Website
                                        </a>
                                    )}

                                    {movie.imdb_id && (
                                        <a
                                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-md transition-colors"
                                        >
                                            IMDb
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
