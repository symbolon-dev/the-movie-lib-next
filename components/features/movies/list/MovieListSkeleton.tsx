import MovieCardSkeleton from './MovieCardSkeleton';

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
