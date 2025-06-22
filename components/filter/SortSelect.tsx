import Select from '../ui/Select';
import { SORT_OPTIONS, MovieSortOption } from '@/types/movie';
import { useMovieStore } from '@/lib/store';

type SortSelectProps = {
    className?: string;
};

const SortSelect = ({ className = '' }: SortSelectProps) => {
    const { sortBy, setSortBy } = useMovieStore();

    const selectedOption = SORT_OPTIONS.find(option => option.value === sortBy);

    const handleChange = (option: { value: string | number; label: string } | undefined) => {
        if (option && typeof option.value === 'string') {
            setSortBy(option.value as MovieSortOption);
        }
    };

    return (
        <Select
            options={SORT_OPTIONS}
            value={selectedOption}
            onChange={handleChange}
            label="Sort by"
            className={className}
        />
    );
};

export default SortSelect;
