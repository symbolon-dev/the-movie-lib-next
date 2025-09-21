import { EmptyState } from '@/components/common/feedback/EmptyState';
import { MovieCard } from '@/components/movie/card/MovieCard';
import { ListSkeleton } from '@/components/skeleton/common/ListSkeleton';
import { Movie } from '@/types/movie';

type MovieListProps = {
    movies: Movie[];
    className?: string;
    isLoading?: boolean;
};

const MovieList = ({ movies, className = '', isLoading = false }: MovieListProps) => {
    if (isLoading) {
        return <ListSkeleton className={className} />;
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
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
        >
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export { MovieList };
