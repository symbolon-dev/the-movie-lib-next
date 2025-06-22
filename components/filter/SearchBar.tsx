"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Search, XCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useMovieStore } from '@/lib/store';

type SearchBarProps = {
    className?: string;
};

const SearchBar = ({ className = "" }: SearchBarProps) => {
    const { searchQuery, setSearchQuery } = useMovieStore();
    const [query, setQuery] = useState(searchQuery || '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSearchQuery(value);
    };

    const handleClear = () => {
        setQuery('');
        setSearchQuery('');
    };

    useEffect(() => {
        if (searchQuery !== undefined && searchQuery !== query) {
            setQuery(searchQuery);
        }
    }, [searchQuery, query]);

    return (
        <div className={`relative flex items-center ${className}`}>
            <div className="absolute left-3 text-gray-400">
                <Search size={20} />
            </div>

            <Input
                type="text"
                placeholder={"Search movies..."}
                value={query}
                onChange={handleChange}
                className="w-full pl-10 pr-10"
            />

            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <XCircle size={20} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
