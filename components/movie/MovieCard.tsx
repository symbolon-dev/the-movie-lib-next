import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';

import { Movie } from '@/types/movie';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

export default function MovieCard({ movie, className = '' }: MovieCardProps) {
    const releaseYear = movie.release_date ? dayjs(movie.release_date).year() : 'Unknown';

    const votePercentage = Math.round(movie.vote_average * 10);

    const getRatingColor = () => {
        if (votePercentage >= 70) return 'bg-green-500';
        if (votePercentage >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform hover:scale-105 ${className}`}
        >
            <Link
                href={`/movies/${movie.id}`}
                className="relative flex aspect-[2/3] overflow-hidden"
            >
                {movie.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                    />
                ) : (
                    <div className="flex size-full items-center justify-center bg-gray-900 text-center text-gray-500">
                        No Image Available
                    </div>
                )}

                <div className="absolute bottom-2 left-2 flex size-10 items-center justify-center rounded-full bg-black/70">
                    <div
                        className={`flex size-8 items-center justify-center rounded-full ${getRatingColor()}`}
                    >
                        <span className="text-xs font-bold text-white">{votePercentage}%</span>
                    </div>
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
