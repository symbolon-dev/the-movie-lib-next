import { create } from 'zustand';
import { Movie, MovieDetail, MovieDiscoverParams, MovieResponse, MovieSortOption, MovieSortOptions } from '@/types/movie';

type MovieState = {
    movies: Movie[] | undefined;
    isLoading: boolean;
    error: string | undefined;
    sortBy: MovieSortOption;
    selectedGenres: number[];
    searchQuery: string;
    genres: { id: number; name: string }[] | undefined;
    setSortBy: (sortOption: MovieSortOption) => void;
    setSelectedGenres: (genres: number[]) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
    fetchMovies: () => Promise<void>;
    discoverMovies: (params?: MovieDiscoverParams) => Promise<void>;
    searchMovies: (query: string) => Promise<void>;
    fetchMovieDetails: (id: string) => Promise<MovieDetail | undefined>;
    fetchGenres: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set, get) => ({
    movies: undefined,
    isLoading: false,
    error: undefined,
    sortBy: MovieSortOptions.POPULARITY_DESC,
    selectedGenres: [],
    searchQuery: '',
    genres: undefined,

    setSortBy: (sortOption: MovieSortOption) => {
        set({ sortBy: sortOption });
        get().fetchMovies();
    },

    setSelectedGenres: (genres: number[]) => {
        set({ selectedGenres: genres });
        get().fetchMovies();
    },
    
    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().fetchMovies();
    },
    
    resetFilters: () => {
        set({
            searchQuery: '',
            selectedGenres: [],
            sortBy: MovieSortOptions.POPULARITY_DESC
        });
        get().fetchMovies();
    },
    
    fetchMovies: async () => {
        const { searchQuery } = get();
        
        if (searchQuery && searchQuery.trim().length > 0) {
            return get().searchMovies(searchQuery);
        } else {
            return get().discoverMovies();
        }
    },

    discoverMovies: async (params?: MovieDiscoverParams) => { 
        try {
            set({ 
                isLoading: true, 
                error: undefined, 
            });

            const { sortBy, selectedGenres } = get();
            
            const url = new URL('/api/movies/discover', window.location.origin);
            
            if (params?.sortBy || sortBy) {
                url.searchParams.append('sort_by', params?.sortBy || sortBy);
            }
            
            if (selectedGenres.length > 0) {
                url.searchParams.append('with_genres', selectedGenres.join(','));
            }
            
            if (params?.page) {
                url.searchParams.append('page', params.page.toString());
            }

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`Error fetching movies: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }
            const movies = json as MovieResponse;

            set({ 
                movies: movies.results, 
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },
    
    searchMovies: async (query: string) => {
        if (!query || query.trim() === '') {
            return get().discoverMovies();
        }
        
        try {
            set({ 
                isLoading: true, 
                error: undefined, 
            });
            
            const { selectedGenres, sortBy } = get();
            
            const url = new URL('/api/movies/search', window.location.origin);
            url.searchParams.append('query', query);
            
            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`Error searching movies: ${response.statusText}`);
            }
            
            const json = await response.json();
            if (json.error) {
                const errorDetails = json.details ? `: ${json.details}` : '';
                throw new Error(`${json.error}${errorDetails}`);
            }
            
            const movies = json as MovieResponse;
            if (selectedGenres.length > 0) {
                movies.results = movies.results.filter(movie => 
                    movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
                );
            }
            
            if (sortBy) {
                const [field, direction] = sortBy.split('.');
                const isAsc = direction === 'asc';
                
                movies.results.sort((a, b) => {
                    let valueA: any;
                    let valueB: any;
                    
                    switch (field) {
                        case 'title':
                        case 'original_title':
                            valueA = a[field].toLowerCase();
                            valueB = b[field].toLowerCase();
                            break;
                        case 'primary_release_date':
                            valueA = new Date(a.release_date).getTime();
                            valueB = new Date(b.release_date).getTime();
                            break;
                        default:
                            valueA = a[field as keyof Movie] || 0;
                            valueB = b[field as keyof Movie] || 0;
                    }
                    
                    if (isAsc) {
                        return valueA > valueB ? 1 : -1;
                    } else {
                        return valueA < valueB ? 1 : -1;
                    }
                });
            }
            
            set({ 
                movies: movies.results,
                isLoading: false 
            });
        } catch (error) {
            console.error('Failed to search movies:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },

    fetchMovieDetails: async (id: string) => {
        if (!id) {
            throw new Error('Movie ID cannot be empty');
        }

        try {
            set({ 
                isLoading: true, 
                error: undefined, 
            });

            const response = await fetch(`/api/movies/${id}`);

            if (!response.ok) {
                throw new Error(`Error fetching movie details: ${response.statusText}`);
            }

            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }

            const movie = json as MovieDetail;

            set({ 
                isLoading: false, 
            });

            return movie;
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },
    
    fetchGenres: async () => {
        try {
            set({ 
                isLoading: true, 
                error: undefined, 
            });
            
            const response = await fetch('/api/movies/genre');
            
            if (!response.ok) {
                throw new Error(`Error fetching genres: ${response.statusText}`);
            }
            
            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }
            
            set({ 
                genres: json.genres,
                isLoading: false, 
            });
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            set({ 
                error: error instanceof Error ? error.message : 'An unknown error occurred', 
                isLoading: false, 
            });
        }
    },
}));
