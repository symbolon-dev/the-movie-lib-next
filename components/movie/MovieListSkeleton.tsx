import React from 'react';

const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg animate-pulse">
            <div className="relative flex aspect-[2/3] bg-gray-700"></div>
            <div className="flex flex-1 flex-col p-4">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
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
}

export default MovieListSkeleton;
