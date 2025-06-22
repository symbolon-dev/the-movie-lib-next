import { FC } from 'react';
import Select from '../ui/Select';
import { MovieSortOption, MovieSortOptions } from '@/types/movie';
import { useMovieStore } from '@/lib/store';

type SortSelectProps = {
    className?: string;
};

const SortSelect: FC<SortSelectProps> = ({ className = '' }) => {
    const { sortBy, setSortBy } = useMovieStore();
    
    const formatSortOption = (option: string): string => {
        const [field, direction] = option.split('.');
        const formattedField = field
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return `${formattedField} (${direction === 'asc' ? 'ascending' : 'descending'})`;
    };

    const sortOptions = Object.values(MovieSortOptions).map(option => ({
        value: option,
        label: formatSortOption(option),
    }));

    const selectedOption = sortOptions.find(option => option.value === sortBy);

    const handleSelectChange = (option: { value: string | number; label: string } | undefined) => {
        if (option && typeof option.value === 'string') {
            const selectedValue = option.value as MovieSortOption;
            setSortBy(selectedValue);
        }
    };

    return (
        <Select
            options={sortOptions}
            value={selectedOption}
            onChange={handleSelectChange}
            label="Sort by"
            className={className}
        />
    );
};

export default SortSelect;
