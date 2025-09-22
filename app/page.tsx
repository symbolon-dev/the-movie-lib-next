import type { Metadata } from 'next';

import { MovieFilterWithSkeleton } from '@/components/movie/filter/MovieFilterWithSkeleton';
import { MovieResults } from '@/components/movie/list/MovieResults';

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
    openGraph: {
        title: 'Movie Library - Discover Amazing Movies',
        description:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
        type: 'website',
        siteName: 'Movie Library',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Movie Library - Discover Amazing Movies',
        description:
            'Explore thousands of movies, filter by genre, search for your favorites, and discover new films to watch.',
    },
};

const Home = async () => {
    return (
        <div className="flex flex-col gap-10 pt-6 pb-12">
            <header className="space-y-3 text-center lg:text-left">
                <h1 className="heading-1">Discover Your Next Favorite Movie</h1>
                <p className="text-lead text-muted-foreground">
                    Browse trending titles, fine-tune filters, and dive into detailed information
                    for every film.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
                <section id="filters" className="lg:sticky lg:top-28">
                    <MovieFilterWithSkeleton />
                </section>

                <section id="results">
                    <MovieResults />
                </section>
            </div>
        </div>
    );
};

export default Home;
