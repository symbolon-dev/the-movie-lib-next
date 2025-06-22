import React from 'react';

const MovieCardSkeleton = () => {
    return (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg">
            <div className="relative flex aspect-[2/3] bg-gray-700"></div>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-700"></div>
                <div className="mb-3 h-4 w-1/2 rounded bg-gray-700"></div>
                <div className="h-4 w-1/4 rounded bg-gray-700"></div>
            </div>
        </div>
    );
};

const MovieListSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <MovieCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default MovieListSkeleton;
