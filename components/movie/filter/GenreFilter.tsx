'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGenres } from '@/hooks/use-genres';
import { useMovieFilters } from '@/hooks/use-movie-filters';
import { cn } from '@/lib/utils';

type GenreFilterProps = {
    className?: string;
};

const GenreFilter = ({ className = '' }: GenreFilterProps) => {
    const { selectedGenres, setSelectedGenres } = useMovieFilters();
    const { genres, isLoading } = useGenres();

    const isSelected = (genreId: number) => selectedGenres.includes(genreId);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(
            selectedGenres.includes(genreId)
                ? selectedGenres.filter((id) => id !== genreId)
                : [...selectedGenres, genreId],
        );
    };

    if (isLoading || !genres) {
        return (
            <div className={cn('flex flex-wrap gap-2', className)}>
                {Array.from({ length: 19 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-16 rounded-md" />
                ))}
            </div>
        );
    }

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {genres.map((genre) => (
                <Badge
                    key={genre.id}
                    variant={isSelected(genre.id) ? 'default' : 'secondary'}
                    className={cn(
                        'cursor-pointer transition-colors focus:outline-none',
                        !isSelected(genre.id) && 'hover:border-primary hover:bg-primary/10',
                    )}
                    onClick={() => handleGenreToggle(genre.id)}
                    onMouseDown={(e) => e.preventDefault()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleGenreToggle(genre.id);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected(genre.id)}
                    aria-label={`${isSelected(genre.id) ? 'Remove' : 'Add'} ${genre.name} filter`}
                >
                    {genre.name}
                </Badge>
            ))}
        </div>
    );
};

export { GenreFilter };
