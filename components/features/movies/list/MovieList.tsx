import { Movie } from '@/types/movie';

import EmptyState from '@/components/shared/common/EmptyState';
import MovieCard from './MovieCard';
import MovieListSkeleton from './MovieListSkeleton';

type MovieListProps = {
    movies: Movie[];
    className?: string;
    isLoading?: boolean;
};

const MovieList = ({ movies, className = '', isLoading = false }: MovieListProps) => {
    if (isLoading) {
        return <MovieListSkeleton />;
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
        <div className={className}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
