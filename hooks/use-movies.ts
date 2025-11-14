'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { sortMovies } from '@/lib/movie-filters';
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

    const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['movies', query, sortBy, genres],
            queryFn: async ({ pageParam = 1 }) => {
                const baseUrl = query
                    ? `/api/movies/search?query=${encodeURIComponent(query)}&page=${pageParam}`
                    : `/api/movies/discover?sort_by=${sortBy}&with_genres=${genres}&page=${pageParam}`;

                return fetcher(baseUrl);
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                if (lastPage.page < lastPage.total_pages) {
                    return lastPage.page + 1;
                }
                return undefined;
            },
            staleTime: 60000, // 1 minute
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        });

    const allMovies: Movie[] = data?.pages.flatMap((page) => page.results) ?? [];

    const filteredMovies =
        genres && query
            ? allMovies.filter((movie) => {
                  const genreIds = genres.split(',').map(Number);
                  return genreIds.every((genreId) => movie.genre_ids.includes(genreId));
              })
            : allMovies;

    const sortedMovies = query ? sortMovies(filteredMovies, sortBy) : filteredMovies;

    const uniqueMovies = sortedMovies.filter(
        (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
    );

    const lastPage = data?.pages[data.pages.length - 1];
    const totalPages = lastPage?.total_pages ?? 0;
    const totalResults = lastPage?.total_results ?? 0;
    const currentPage = data?.pages.length ?? 0;

    const loadMoreMovies = () => {
        if (!isFetchingNextPage && hasNextPage) {
            void fetchNextPage();
        }
    };

    return {
        movies: uniqueMovies,
        totalPages,
        totalResults,
        currentPage,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        hasMore: hasNextPage,
        error,
        loadMoreMovies,
        mutate: refetch,
    };
};
