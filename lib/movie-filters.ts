import type { Movie } from '@/types/movie';

type SortableValue = string | number | undefined;

export const DEFAULT_SORT = 'popularity.desc';

const DATE_FIELDS = ['release_date', 'primary_release_date'] as const;
const NUMERIC_FIELDS = ['popularity', 'vote_average', 'vote_count'] as const;

type DateField = (typeof DATE_FIELDS)[number];
type NumericField = (typeof NUMERIC_FIELDS)[number];
type MovieField = keyof Movie;

const isDateField = (field: string): field is DateField =>
    DATE_FIELDS.includes(field as DateField);

const isNumericField = (field: string): field is NumericField =>
    NUMERIC_FIELDS.includes(field as NumericField);

const getSortValue = (movie: Movie, field: string): SortableValue => {
    if (isDateField(field)) {
        const rawValue = movie[field];
        const dateValue =
            typeof rawValue === 'string' ? rawValue : movie.release_date;
        if (!dateValue) return undefined;
        const parsed = new Date(dateValue);
        return isNaN(parsed.getTime()) ? undefined : parsed.getTime();
    }

    if (isNumericField(field)) {
        return movie[field];
    }

    // Fallback for string fields like title, original_title
    const value = movie[field as MovieField];
    if (typeof value === 'string') {
        return value.toLowerCase();
    }

    return undefined;
};

const compareValues = (
    aValue: SortableValue,
    bValue: SortableValue,
    direction: 'asc' | 'desc',
): number => {
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return direction === 'asc' ? 1 : -1;
    if (bValue === undefined) return direction === 'asc' ? -1 : 1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
    }

    return 0;
};

export const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
    const [field, direction] = sortBy.split('.') as [
        string,
        'asc' | 'desc' | undefined,
    ];

    if (direction !== 'asc' && direction !== 'desc') return movies;

    return [...movies].sort((a, b) => {
        const aValue = getSortValue(a, field);
        const bValue = getSortValue(b, field);
        return compareValues(aValue, bValue, direction);
    });
};
