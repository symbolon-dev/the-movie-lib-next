import { memo } from 'react';
import Link from 'next/link';
import { PosterImage } from '@/components/movie/shared/PosterImage';
import { Card, CardContent } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { cn } from '@/lib/utils';
import { useMovieStore } from '@/stores/movie-store';
import { Movie } from '@/types/movie';
import { formatYear } from '@/utils/formatter';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

export const MovieCard = memo(({ movie, className = '' }: MovieCardProps) => {
    const invalidateCache = useMovieStore((state) => state.invalidateCache);
    const releaseYear = formatYear(movie.release_date);

    const handleClick = () => {
        // Invalidate cache so loading state triggers when returning
        invalidateCache();
    };

    return (
        <MagicCard
            gradientColor="#0EA5E955"
            className={cn(
                'h-full cursor-pointer transition-transform duration-300 hover:scale-105',
                className,
            )}
        >
            <Link
                href={`/movies/${movie.id}`}
                className="block h-full"
                aria-label={`View details for ${movie.title}`}
                onClick={handleClick}
            >
                <Card className="group flex h-full flex-col overflow-hidden border-none bg-transparent shadow-none">
                    <div className="relative flex overflow-hidden">
                        <PosterImage
                            path={movie.poster_path ?? undefined}
                            title={movie.title}
                            className="size-full"
                        />
                    </div>

                    <CardContent className="flex flex-col p-4">
                        <div className="mb-2 h-16">
                            <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
                                {movie.title}
                            </h3>
                        </div>

                        <div className="mb-2 h-6">
                            <p className="text-muted-foreground text-sm font-medium">{releaseYear}</p>
                        </div>

                        <div className="mb-3 h-12">
                            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                                {movie.overview ?? 'No description available'}
                            </p>
                        </div>

                        <div className="border-border border-t pt-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                                    <span className="text-foreground text-sm font-medium">Rating</span>
                                </div>
                                <span className="text-primary text-lg font-bold">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </MagicCard>
    );
});

MovieCard.displayName = 'MovieCard';
