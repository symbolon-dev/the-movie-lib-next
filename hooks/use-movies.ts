'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { MovieResponseSchema } from '@/schemas/movie';
import { Movie, MovieResponse } from '@/types/movie';

const fetcher = async (url: string): Promise<MovieResponse> => {
    const res = await fetch(url);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    const validated = MovieResponseSchema.safeParse(json);

    if (!validated.success) {
        throw new Error('Invalid response format from API');
    }

    return validated.data;
};

export const useMovies = () => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [allMovies, setAllMovies] = useState<Movie[]>([]);

    const query = searchParams.get('q') || '';
    const sortBy = searchParams.get('sort') || 'popularity.desc';
    const genres = searchParams.get('genres') || '';

    const filterKey = `${query}-${sortBy}-${genres}`;
    const previousFilterKey = useRef(filterKey);

    useEffect(() => {
        if (previousFilterKey.current !== filterKey) {
            setCurrentPage(1);
            setAllMovies([]);
            previousFilterKey.current = filterKey;
        }
    }, [filterKey]);

    const apiUrl = query
        ? `/api/movies/search?query=${encodeURIComponent(query)}&page=${currentPage}`
        : `/api/movies/discover?sort_by=${sortBy}&with_genres=${genres}&page=${currentPage}`;

    const { data, error, isLoading, mutate } = useSWR<MovieResponse>(
        [apiUrl, filterKey],
        ([url]) => fetcher(url),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1 minute
        },
    );

    useEffect(() => {
        if (data) {
            if (currentPage === 1) {
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
    }, [data, currentPage]);

    const filteredMovies =
        genres && query
            ? allMovies.filter((movie) => {
                  const genreIds = genres.split(',').map(Number);
                  return genreIds.every((genreId) => movie.genre_ids.includes(genreId));
              })
            : allMovies;

    const loadMoreMovies = useCallback(() => {
        if (!isLoading && data && currentPage < data.total_pages) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [isLoading, data, currentPage]);

    return {
        movies: filteredMovies,
        totalPages: data?.total_pages || 0,
        totalResults: data?.total_results || 0,
        currentPage,
        isLoading,
        error,
        loadMoreMovies,
        mutate,
    };
};
