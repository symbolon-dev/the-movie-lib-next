'use client';

import { Search, XCircle } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/stores/filter-store';

type SearchBarProps = {
    className?: string;
};

const SearchBar = ({ className = '' }: SearchBarProps) => {
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
    const searchQuery = useFilterStore((state) => state.searchQuery);
    const [query, setQuery] = useState(searchQuery);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleClear = () => {
        setQuery('');
        setSearchQuery('');
    };

    useEffect(() => {
        if (query === searchQuery) {
            return;
        }

        const timer = setTimeout(() => {
            setSearchQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, searchQuery, setSearchQuery]);

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    return (
        <div className={cn('relative flex items-center', className)}>
            <div className="text-muted-foreground pointer-events-none absolute left-3">
                <Search size={20} />
            </div>

            <Input
                type="text"
                placeholder={'Search movies...'}
                value={query}
                onChange={handleChange}
                className="w-full pr-10 pl-10"
            />

            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-muted-foreground hover:text-foreground absolute right-3"
                    aria-label="Clear search"
                >
                    <XCircle size={20} />
                </button>
            )}
        </div>
    );
};

export { SearchBar };
