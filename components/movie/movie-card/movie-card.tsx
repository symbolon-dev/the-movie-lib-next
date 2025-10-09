import { Star } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

import { PosterImage } from '@/components/movie/shared/poster-image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Movie } from '@/types/movie';
import { formatYear } from '@/utils/formatter';

type MovieCardProps = {
    movie: Movie;
    className?: string;
};

export const MovieCard = memo(({ movie, className = '' }: MovieCardProps) => {
    const releaseYear = formatYear(movie.release_date);
    const rating = (movie.vote_average ?? 0).toFixed(1);

    const handleClick = () => {
        const scrollY = Math.max(0, Math.round(window.scrollY));
        if (scrollY > 0) {
            sessionStorage.setItem('movie-list-scroll-position', String(scrollY));
        }

        sessionStorage.setItem('navigated-from-movie-list', 'true');
    };

    return (
        <Card
            className={cn(
                'border-primary/30 shadow-primary/10 focus-within:ring-primary/60 focus-within:ring-offset-background relative h-full cursor-pointer rounded-xl border shadow-lg transition-transform duration-300 focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-offset-2 hover:scale-[1.02]',
                className,
            )}
        >
            <Link
                href={`/movies/${movie.id}`}
                className="group relative block h-full rounded-xl focus:outline-none"
                aria-label={`View details for ${movie.title}`}
                onClick={handleClick}
            >
                <div className="round relative h-full overflow-hidden rounded-xl">
                    <PosterImage
                        path={movie.poster_path}
                        title={movie.title}
                        className="transition-transform duration-500 ease-out group-focus-within:-translate-y-2 group-focus-within:scale-105 group-hover:-translate-y-2 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 transition-opacity duration-500 ease-out group-focus-within:opacity-100 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-full px-5 pb-6 transition-transform duration-500 ease-out group-focus-within:translate-y-0 group-hover:translate-y-0">
                        <div className="space-y-3">
                            <h3 className="heading-5 line-clamp-2 text-white drop-shadow-sm">
                                {movie.title}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-white/80">
                                <span>{releaseYear ?? '—'}</span>
                                <span className="flex items-center gap-1 text-white/80">
                                    <Star className="size-3.5" aria-hidden="true" />
                                    <span className="text-sm font-medium">{rating}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <span className="sr-only">
                    {`${movie.title} - Release ${releaseYear ?? 'unknown'}, Rating ${rating}`}
                </span>
            </Link>
        </Card>
    );
});

MovieCard.displayName = 'MovieCard';
