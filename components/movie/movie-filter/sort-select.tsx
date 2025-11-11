import { ArrowDown, ArrowUp } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMovieFilters } from '@/hooks/use-movie-filters';
import { cn } from '@/lib/utils';
import type { MovieSortOption } from '@/types/movie';

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Popularity', icon: ArrowDown },
    { value: 'popularity.asc', label: 'Popularity', icon: ArrowUp },
    { value: 'primary_release_date.desc', label: 'Release Date', icon: ArrowDown },
    { value: 'primary_release_date.asc', label: 'Release Date', icon: ArrowUp },
    { value: 'title.asc', label: 'Title', icon: ArrowUp },
    { value: 'title.desc', label: 'Title', icon: ArrowDown },
    { value: 'vote_average.desc', label: 'Rating', icon: ArrowDown },
    { value: 'vote_average.asc', label: 'Rating', icon: ArrowUp },
    { value: 'original_title.asc', label: 'Original Title', icon: ArrowUp },
    { value: 'original_title.desc', label: 'Original Title', icon: ArrowDown },
    { value: 'revenue.asc', label: 'Revenue', icon: ArrowUp },
    { value: 'revenue.desc', label: 'Revenue', icon: ArrowDown },
    { value: 'vote_count.asc', label: 'Vote Count', icon: ArrowUp },
    { value: 'vote_count.desc', label: 'Vote Count', icon: ArrowDown },
];

type SortSelectProps = {
    className?: string;
};

export const SortSelect = ({ className = '' }: SortSelectProps) => {
    const { sortBy, setSortBy } = useMovieFilters();

    const handleValueChange = (value: string) => {
        setSortBy(value as MovieSortOption);
    };

    return (
        <div className={cn('w-full', className)}>
            <Select value={sortBy} onValueChange={handleValueChange}>
                <SelectTrigger className="w-full" aria-label="Sort movies by">
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                                <span>{option.label}</span>
                                <option.icon className="h-3 w-3" />
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
