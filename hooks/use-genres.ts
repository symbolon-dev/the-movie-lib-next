'use client';

import useSWR from 'swr';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = res.json();
    return json;
};

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
