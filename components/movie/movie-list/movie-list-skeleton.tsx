import { MovieCardSkeleton } from '@/components/movie/movie-card/movie-card-skeleton';

type MovieListSkeletonProps = {
    count?: number;
    className?: string;
};

export const MovieListSkeleton = ({ count = 20, className = '' }: MovieListSkeletonProps) => (
    <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
        {Array.from({ length: count }, (_, index) => (
            <MovieCardSkeleton key={index} className="animate-pulse" />
        ))}
    </div>
);
