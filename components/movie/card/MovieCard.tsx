import { memo } from 'react';
import Link from 'next/link';
import { PosterImage } from '@/components/movie/shared/PosterImage';
import { RatingDisplay } from '@/components/movie/shared/RatingDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Movie } from '@/types/movie';
import { formatYear } from '@/utils/formatter';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

export const MovieCard = memo(({ movie, className = '' }: MovieCardProps) => {
    const releaseYear = formatYear(movie.release_date);

    return (
        <Card
            className={cn(
                'group hover:border-primary hover:shadow-primary/20 flex flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg',
                className,
            )}
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
                <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
                    {movie.title}
                </h3>

                <p className="text-muted-foreground text-sm">{releaseYear}</p>

                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {movie.overview ?? 'No description available'}
                </p>
            </CardContent>
        </Card>
    );
});

MovieCard.displayName = 'MovieCard';
