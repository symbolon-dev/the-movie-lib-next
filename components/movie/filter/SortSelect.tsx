import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMovieStore } from '@/stores/movie-store';
import { MovieSortOption } from '@/types/movie';

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'primary_release_date.desc', label: 'Release Date ↓' },
    { value: 'primary_release_date.asc', label: 'Release Date ↑' },
    { value: 'title.asc', label: 'Title ↑' },
    { value: 'title.desc', label: 'Title ↓' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'original_title.asc', label: 'Original Title ↑' },
    { value: 'original_title.desc', label: 'Original Title ↓' },
    { value: 'revenue.asc', label: 'Revenue ↑' },
    { value: 'revenue.desc', label: 'Revenue ↓' },
    { value: 'vote_count.asc', label: 'Vote Count ↑' },
    { value: 'vote_count.desc', label: 'Vote Count ↓' },
];

type SortSelectProps = {
    className?: string;
};

export const SortSelect = ({ className = '' }: SortSelectProps) => {
    const { sortBy, setSortBy } = useMovieStore();

    const handleValueChange = (value: string) => {
        setSortBy(value as MovieSortOption);
    };

    return (
        <div className={`w-full ${className}`}>
            <Select value={sortBy} onValueChange={handleValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
