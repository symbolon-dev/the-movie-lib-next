'use client';

import { useEffect } from 'react';
import Badge from '@/components/ui/Badge';
import { useMovieStore } from '@/lib/store';

type GenreFilterProps = {
    className?: string;
};

const GenreFilter = ({ className = '' }: GenreFilterProps) => {
    const { selectedGenres, setSelectedGenres, genres, getGenres } = useMovieStore();

    const isSelected = (genreId: number) => selectedGenres.includes(genreId);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(
            selectedGenres.includes(genreId)
                ? selectedGenres.filter(id => id !== genreId)
                : [...selectedGenres, genreId]
        );
    };

    useEffect(() => {
        if (!genres) {
            getGenres();
        }
    }, [genres, getGenres]);

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {genres?.map((genre) => (
                <Badge
                    key={genre.id}
                    className={`cursor-pointer transition-colors ${isSelected(genre.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
                        }`}
                    onClick={() => handleGenreToggle(genre.id)}
                    role="button"
                    aria-pressed={isSelected(genre.id)}
                >
                    {genre.name}
                </Badge>
            ))}
        </div>
    );
}

export default GenreFilter;
