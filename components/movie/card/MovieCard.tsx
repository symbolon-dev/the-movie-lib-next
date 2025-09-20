import { memo } from 'react';
import Link from 'next/link';
import { PosterImage, RatingDisplay } from '@/components/movie';
import { Card, CardContent } from '@/components/ui/card';
import { formatYear } from '@/lib/formatters';
import { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
    const releaseYear = formatYear(movie.release_date);

    return (
        <Card
            className={cn('flex flex-col overflow-hidden transition-transform hover:scale-105', className)}
        >
            <Link
                href={`/movies/${movie.id}`}
                className="relative flex overflow-hidden"
                aria-label={`View details for ${movie.title}`}
            >
                <PosterImage
                    path={movie.poster_path ?? undefined}
                    title={movie.title}
                    className="size-full"
                />

                <div className="absolute bottom-2 left-2 flex size-10 items-center justify-center rounded-full bg-black/70">
                    <RatingDisplay score={movie.vote_average} showPercentage={true} size="sm" />
                </div>
            </Link>

            <CardContent className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="line-clamp-2 text-lg font-bold text-foreground">{movie.title}</h3>

                <p className="text-sm text-muted-foreground">{releaseYear}</p>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {movie.overview ?? 'No description available'}
                </p>
            </CardContent>
        </Card>
    );
};

export default memo(MovieCard);
