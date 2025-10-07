'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Genre = {
    id: number;
    name: string;
};

type GenreResponse = {
    genres: Genre[];
};

export const useGenres = () => {
    const { data, error, isLoading } = useSWR<GenreResponse>('/api/movies/genre', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        dedupingInterval: 86400000, // 24 hours
    });

    return {
        genres: data?.genres || [],
        isLoading,
        error,
    };
};
