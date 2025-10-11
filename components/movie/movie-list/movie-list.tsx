import { MovieCard } from '@/components/movie/movie-card/movie-card';
import { MovieListSkeleton } from '@/components/movie/movie-list/movie-list-skeleton';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';
import { Movie } from '@/types/movie';

type MovieListProps = {
    movies: Movie[];
    className?: string;
    isLoading?: boolean;
};

export const MovieList = ({ movies, className = '', isLoading = false }: MovieListProps) => {
    if (isLoading) {
        return <MovieListSkeleton className={className} />;
    }

    if (movies.length === 0) {
        return (
            <div className={className}>
                <EmptyState
                    title="No movies found"
                    message="Try different search criteria or filters."
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
                className,
            )}
        >
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};
