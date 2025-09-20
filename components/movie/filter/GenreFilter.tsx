'use client';

import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useMovieStore } from '@/stores/movieStore';

type GenreFilterProps = {
    className?: string;
};

export const GenreFilter = ({ className = '' }: GenreFilterProps) => {
    const { selectedGenres, setSelectedGenres, genres, getGenres } = useMovieStore();

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

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {genres?.map((genre) => (
                <Badge
                    key={genre.id}
                    variant={isSelected(genre.id) ? 'default' : 'secondary'}
                    className="cursor-pointer transition-colors"
                    onClick={() => handleGenreToggle(genre.id)}
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
