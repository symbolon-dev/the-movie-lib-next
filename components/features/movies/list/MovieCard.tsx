import Link from 'next/link';

import { Movie } from '@/types/movie';
import PosterImage from '@/components/shared/common/PosterImage';
import RatingDisplay from '@/components/shared/common/RatingDisplay';
import { formatYear } from '@/lib/formatters';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
    const releaseYear = formatYear(movie.release_date);

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform hover:scale-105 ${className}`}
        >
            <Link
                href={`/movies/${movie.id}`}
                className="relative flex overflow-hidden"
            >
                <PosterImage
                    path={movie?.poster_path ?? undefined}
                    title={movie.title}
                    className="size-full"
                />

                <div className="absolute bottom-2 left-2 flex size-10 items-center justify-center rounded-full bg-black/70">
                    <RatingDisplay
                        score={movie.vote_average}
                        showPercentage={true}
                        size="sm"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white">{movie.title}</h3>

                <p className="text-sm text-gray-400">{releaseYear}</p>

                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    {movie.overview ?? 'No description available'}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;

