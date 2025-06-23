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

export default MovieCardSkeleton;
