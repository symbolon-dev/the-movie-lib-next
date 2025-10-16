'use client';

import { Search, XCircle } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';

import { Input } from '@/components/ui/input';
import { useMovieFilters } from '@/hooks/use-movie-filters';
import { cn } from '@/lib/utils';

type SearchBarProps = {
    className?: string;
};

const DEBOUNCE_DELAY = 300;

export const SearchBar = ({ className = '' }: SearchBarProps) => {
    const { searchQuery, setSearchQuery } = useMovieFilters();
    const [query, setQuery] = useState(searchQuery);
    const prevSearchQueryRef = useRef(searchQuery);

    useDebounce(
        () => {
            if (query !== searchQuery) {
                prevSearchQueryRef.current = query;
                setSearchQuery(query);
            }
        },
        DEBOUNCE_DELAY,
        [query],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleClear = () => {
        setQuery('');
        prevSearchQueryRef.current = '';
        setSearchQuery('');
    };

    useEffect(() => {
        if (searchQuery !== prevSearchQueryRef.current) {
            setQuery(searchQuery);
            prevSearchQueryRef.current = searchQuery;
        }
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
