'use client';

import { useEffect } from 'react';

import { GenreFilterSkeleton } from '@/components/skeleton/filter/GenreFilterSkeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/stores/filter-store';
import { useGenreStore } from '@/stores/genre-store';

type GenreFilterProps = {
    className?: string;
};

const GenreFilter = ({ className = '' }: GenreFilterProps) => {
    const { selectedGenres, setSelectedGenres } = useFilterStore();
    const { genres, getGenres } = useGenreStore();

    const isSelected = (genreId: number) => selectedGenres.includes(genreId);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(
            selectedGenres.includes(genreId)
                ? selectedGenres.filter((id) => id !== genreId)
                : [...selectedGenres, genreId],
        );
    };

    useEffect(() => {
        if (!genres) {
            getGenres();
        }
    }, [genres, getGenres]);

    if (!genres) {
        return <GenreFilterSkeleton className={className} />;
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
