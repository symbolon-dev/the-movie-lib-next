'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { Movie, MovieResponse } from '@/types/movie';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = res.json();
    return json;
};

export const useMovies = () => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [isRestored, setIsRestored] = useState(false);

    const query = searchParams.get('q') || '';
    const sortBy = searchParams.get('sort') || 'popularity.desc';
    const genres = searchParams.get('genres') || '';

    const filterKey = `${query}-${sortBy}-${genres}`;
    const previousFilterKey = useRef(filterKey);

    useEffect(() => {
        const cameFromMovieDetail = sessionStorage.getItem('navigated-from-movie-list') === 'true';

        if (cameFromMovieDetail) {
            const savedMovies = sessionStorage.getItem('movie-list-movies');
            const savedPage = sessionStorage.getItem('movie-list-current-page');
            const savedFilterKey = sessionStorage.getItem('movie-list-filter-key');

            if (savedMovies && savedPage && savedFilterKey === filterKey) {
                try {
                    const parsedMovies = JSON.parse(savedMovies);
                    setAllMovies(parsedMovies);
                    setCurrentPage(parseInt(savedPage));
                    previousFilterKey.current = filterKey;
                    setIsRestored(true);
                    return;
                } catch (error) {
                    console.error('Failed to restore movie state:', error);
                }
            }
        }

        setIsRestored(true);
    }, []);

    useEffect(() => {
        if (!isRestored) return;

        if (previousFilterKey.current !== filterKey) {
            setCurrentPage(1);
            setAllMovies([]);
            previousFilterKey.current = filterKey;
        }
    }, [filterKey, isRestored]);

    const apiUrl = query
        ? `/api/movies/search?query=${encodeURIComponent(query)}&page=${currentPage}`
        : `/api/movies/discover?sort_by=${sortBy}&with_genres=${genres}&page=${currentPage}`;

    const { data, error, isLoading, mutate } = useSWR<MovieResponse>(
        isRestored ? [apiUrl, filterKey] : undefined,
        ([url]) => fetcher(url),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1 minute
        },
    );

    useEffect(() => {
        if (data && isRestored) {
            if (currentPage === 1 && allMovies.length === 0) {
                setAllMovies(data.results);
            } else if (currentPage > 1) {
                setAllMovies((prev) => {
                    const newMovies = data.results.filter(
                        (movie) => !prev.some((existing) => existing.id === movie.id),
                    );
                    return [...prev, ...newMovies];
                });
            }
        }
    }, [data, currentPage, isRestored, allMovies.length]);

    const loadMoreMovies = useCallback(() => {
        if (!isLoading && data && currentPage < data.total_pages) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [isLoading, data, currentPage]);

    useEffect(() => {
        if (allMovies.length > 0) {
            sessionStorage.setItem('movie-list-movies', JSON.stringify(allMovies));
            sessionStorage.setItem('movie-list-current-page', currentPage.toString());
            sessionStorage.setItem('movie-list-filter-key', filterKey);
        }
    }, [allMovies, currentPage, filterKey]);

    return {
        movies: allMovies,
        totalPages: data?.total_pages || 0,
        totalResults: data?.total_results || 0,
        currentPage,
        isLoading,
        error,
        loadMoreMovies,
        mutate,
    };
};
