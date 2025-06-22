import { Movie } from '@/types/movie';
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

    return (
        <div className={className}>
            {movies.length === 0 ? (
                <div className="flex size-full flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-8">
                    <h2 className="text-xl font-bold text-gray-300">
                        No movies found
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Try different search criteria or filters.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;
