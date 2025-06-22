'use client';

import React, { use, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';
import { ArrowLeft, Clock, DollarSign, Film, Info } from 'lucide-react';

import { useMovieStore } from '@/lib/store';
import { MovieDetail } from '@/types/movie';

const formatReleaseDate = (date: string): string => {
    return dayjs(date).format('MMM D, YYYY');
};

const formatRuntime = (minutes: number | null | undefined): string => {
    if (!minutes) return '0min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

type DetailProps = {
    params: Promise<{ id: string }>;
}

const Detail = ({ params }: DetailProps) => {
    const { id } = use(params);
    
    const [movie, setMovie] = useState<MovieDetail | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const { fetchMovieDetails, isLoading } = useMovieStore();

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) {
                setError('Movie ID is missing in URL parameters');
                return;
            }
            
            try {
                const movieData = await fetchMovieDetails(id);
                setMovie(movieData);
                setError(undefined);
            } catch (error) {
                console.error('Error loading movie:', error);
                setError(error instanceof Error ? error.message : 'Unknown error loading movie');
            }
        };

        loadMovie();
    }, [id, fetchMovieDetails]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
                <div className="p-8 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
                    <p className="text-xl text-white">Loading movie data...</p>
                </div>
            </div>
        );
    }

    if (!movie || error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-md rounded-lg bg-gray-800 p-8 text-center shadow-xl">
                    <Info className="mx-auto mb-4 h-16 w-16 text-red-500" />
                    <h2 className="mb-2 text-2xl font-bold text-white">Could not load movie</h2>
                    <p className="mb-6 text-gray-300">
                        {error || "There was an error loading the movie data."}
                    </p>
                    <Link
                        href="/"
                        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <Link
                    href="/"
                    className="mb-6 flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Movies</span>
                </Link>

                <div className="relative mb-10 h-[40vh] overflow-hidden rounded-xl md:h-[50vh]">
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
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                        <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
                            {movie.title}
                        </h1>
                        {movie.tagline && (
                            <p className="mb-4 text-xl italic text-gray-300">
                                {' '}
                                {`"${movie.tagline}"`}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-xl">
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
                                <div className="flex aspect-[2/3] items-center justify-center bg-gray-700">
                                    <Film className="h-16 w-16 text-gray-500" />
                                    <span className="text-gray-400">No poster available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-white md:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center gap-6">
                            <div className="flex items-center">
                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${
                                        movie.vote_average >= 7
                                            ? 'border-green-500'
                                            : movie.vote_average >= 5
                                              ? 'border-yellow-500'
                                              : 'border-red-500'
                                    }`}
                                >
                                    <span className="text-lg font-bold text-white">
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                                <span className="ml-2 text-sm text-gray-400">
                                    ({movie.vote_count} votes)
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-300">Release: </span>
                                <span>{formatReleaseDate(movie.release_date)}</span>
                            </div>

                            {movie.runtime && movie.runtime > 0 && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{formatRuntime(movie.runtime)}</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-200">Overview</h2>
                            <p className="leading-relaxed text-gray-300">{movie.overview}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            {movie.production_companies.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-200">
                                        Production
                                    </h3>
                                    <div className="text-gray-400">
                                        {movie.production_companies
                                            .map((company) => company.name)
                                            .join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.production_countries.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-200">
                                        Countries
                                    </h3>
                                    <div className="text-gray-400">
                                        {movie.production_countries
                                            .map((country) => country.name)
                                            .join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.spoken_languages.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-200">
                                        Languages
                                    </h3>
                                    <div className="text-gray-400">
                                        {movie.spoken_languages.map((lang) => lang.name).join(', ')}
                                    </div>
                                </div>
                            )}

                            {movie.budget > 0 && (
                                <div>
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-200">
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
                                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-200">
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
                                            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                                        >
                                            Official Website
                                        </a>
                                    )}

                                    {movie.imdb_id && (
                                        <a
                                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md bg-yellow-600 px-6 py-2 font-semibold text-black transition-colors hover:bg-yellow-700"
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
