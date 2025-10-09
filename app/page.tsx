import type { Metadata } from 'next';

import { MovieFilter } from '@/components/movie/movie-filter/movie-filter';
import { MovieResults } from '@/components/movie/movie-list/movie-results';
import { ClientErrorBoundary } from '@/components/shared/client-error-boundary';
import { TMDBApi } from '@/lib/tmdb';
import { GenreResponseSchema } from '@/schemas/movie';
import type { MovieGenre } from '@/types/movie';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Movie Library - Discover Amazing Movies',
    description:
        'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    keywords: [
        'movies',
        'films',
        'cinema',
        'entertainment',
        'movie database',
        'search movies',
        'movie genres',
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Movie Library - Discover Amazing Movies',
        description:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
        type: 'website',
        siteName: 'Movie Library',
        url: '/',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Movie Library - Discover Amazing Movies',
        description:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    },
};

const getGenres = async (): Promise<{ genres: MovieGenre[] }> => {
    try {
        const api = TMDBApi();
        const data = await api.fetchMovieGenres();
        const validated = GenreResponseSchema.safeParse(data);

        return validated.success ? validated.data : { genres: [] };
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        return { genres: [] };
    }
};

const Home = async () => {
    const { genres } = await getGenres();

    return (
        <>
            <link rel="preconnect" href="https://api.themoviedb.org" />
            <link rel="preconnect" href="https://image.tmdb.org" />
            <div className="flex flex-col gap-10 pt-6 pb-12">
                <header className="space-y-3 text-center lg:text-left">
                    <h1 className="heading-1">Discover Your Next Favorite Movie</h1>
                    <p className="text-lead text-muted-foreground">
                        Browse trending titles, fine-tune filters, and dive into detailed
                        information for every film.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
                    <section id="filters" className="lg:sticky lg:top-28">
                        <MovieFilter genres={genres} />
                    </section>

                    <section id="results">
                        <ClientErrorBoundary>
                            <MovieResults />
                        </ClientErrorBoundary>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Home;
