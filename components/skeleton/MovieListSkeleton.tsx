import { MovieCardSkeleton } from './MovieCardSkeleton';

type MovieListSkeletonProps = {
    count?: number;
    className?: string;
};

const MovieListSkeleton = ({ count = 20, className = '' }: MovieListSkeletonProps) => {
    return (
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
            {Array.from({ length: count }, (_, index) => (
                <MovieCardSkeleton
                    key={index}
                    className="animate-pulse"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animationDuration: '1.5s'
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export { MovieListSkeleton };