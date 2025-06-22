'use client';

import { useEffect } from 'react';
import Badge from '@/components/ui/Badge';
import { useMovieStore } from '@/lib/store';

type GenreFilterProps = {
    className?: string;
};

const GenreFilter = ({ className = '' }: GenreFilterProps) => {
    const { selectedGenres, setSelectedGenres, genres, fetchGenres, isLoading, error } = useMovieStore();

    const handleGenreToggle = (genreId: number) => {
        const newSelectedGenres = [...selectedGenres];

        if (newSelectedGenres.includes(genreId)) {
            const index = newSelectedGenres.indexOf(genreId);
            newSelectedGenres.splice(index, 1);
        } else {
            newSelectedGenres.push(genreId);
        }

        setSelectedGenres(newSelectedGenres);
    };

    useEffect(() => {
        if (!genres) {
            fetchGenres();
        }
    }, [genres, fetchGenres]);

    const isSelected = (genreId: number) => selectedGenres.includes(genreId);

    if (isLoading) {
        return <div className="py-2">Loading genres...</div>;
    }

    if (error) {
        return <div className="py-2 text-red-500">Error: {error}</div>;
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {genres && genres.map((genre) => (
                <Badge
                    key={genre.id}
                    className={`cursor-pointer transition-colors ${isSelected(genre.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    onClick={() => handleGenreToggle(genre.id)}
                    role="button"
                    aria-pressed={isSelected(genre.id)}
                >
                    {genre.name}
                </Badge>
            ))}

            {genres && genres.length === 0 && !isLoading && !error && (
                <div className="py-2 text-gray-500">No genres available</div>
            )}
        </div>
    );
}

export default GenreFilter;
