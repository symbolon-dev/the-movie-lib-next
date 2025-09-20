import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMovieStore } from '@/lib/store';
import { MovieSortOption, SORT_OPTIONS } from '@/types/movie';

type SortSelectProps = {
    className?: string;
};

const SortSelect = ({ className = '' }: SortSelectProps) => {
    const { sortBy, setSortBy } = useMovieStore();

    const handleValueChange = (value: string) => {
        setSortBy(value as MovieSortOption);
    };

    return (
        <div className={`w-full ${className}`}>
            <label className="mb-2 block text-sm font-medium text-foreground">Sort by</label>
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

export default SortSelect;
