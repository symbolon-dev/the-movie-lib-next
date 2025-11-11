'use client';

import { useSearchParams } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';

import { MovieResponseSchema } from '@/schemas/movie';
import type { Movie, MovieResponse } from '@/types/movie';

const fetcher = async (url: string): Promise<MovieResponse> => {
    const res = await fetch(url);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error ?? `HTTP ${res.status}: ${res.statusText}`);
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

    const query = searchParams.get('q') ?? '';
    const sortBy = searchParams.get('sort') ?? 'popularity.desc';
    const genres = searchParams.get('genres') ?? '';

    const filterKey = `${query}-${sortBy}-${genres}`;

    const getKey = (pageIndex: number, previousPageData: MovieResponse | undefined) => {
        if (previousPageData && previousPageData.page >= previousPageData.total_pages) {
            return null;
        }

        const page = pageIndex + 1;
        const baseUrl = query
            ? `/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`
            : `/api/movies/discover?sort_by=${sortBy}&with_genres=${genres}&page=${page}`;

        return [baseUrl, filterKey];
    };

    const { data, error, isLoading, isValidating, size, setSize, mutate } =
        useSWRInfinite<MovieResponse>(getKey, ([url]) => fetcher(url), {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateFirstPage: false,
            dedupingInterval: 60000,
        });

    const allMovies: Movie[] = data ? data.flatMap((page) => page.results) : [];

    const filteredMovies =
        genres && query
            ? allMovies.filter((movie) => {
                  const genreIds = genres.split(',').map(Number);
                  return genreIds.every((genreId) => movie.genre_ids.includes(genreId));
              })
            : allMovies;

    const uniqueMovies = filteredMovies.filter(
        (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
    );

    const lastPage = data?.[data.length - 1];
    const totalPages = lastPage?.total_pages ?? 0;
    const totalResults = lastPage?.total_results ?? 0;
    const currentPage = size;

    const hasMore = currentPage < totalPages;

    const loadMoreMovies = async () => {
        if (!isValidating && hasMore) {
            await setSize(currentPage + 1);
        }
    };

    return {
        movies: uniqueMovies,
        totalPages,
        totalResults,
        currentPage,
        isLoading: isLoading || (size > 0 && !data),
        isLoadingMore: isValidating,
        hasMore,
        error,
        loadMoreMovies,
        mutate,
    };
};
