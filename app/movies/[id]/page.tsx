import type { Metadata } from 'next';
import { cache, Suspense } from 'react';

import { BackButton } from '@/components/common/navigation/BackButton';
import { ScrollReset } from '@/components/common/navigation/ScrollReset';
import { MovieDetailContent } from '@/components/movie/detail/MovieDetailContent';
import { MovieDetailSkeleton } from '@/components/skeleton/MovieDetailSkeleton';
import { MovieDetailSchema } from '@/schemas/movie';
import type { MovieDetail } from '@/types/movie';
import { TMDBApi } from '@/utils/api';
import { getMovieBackdropUrl } from '@/utils/image';

type DetailProps = {
    params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: DetailProps): Promise<Metadata> => {
    const { id } = await params;

    try {
        const movie = await getMovie(id);

        const title = `${movie.title} - Movie Library`;
        const description =
            movie.overview || `Watch ${movie.title} and discover more amazing movies.`;
        const backdropUrl = movie.backdrop_path
            ? getMovieBackdropUrl(movie.backdrop_path, 'w1280')
            : undefined;
        const openGraphImages = backdropUrl
            ? [{ url: backdropUrl, width: 1280, height: 720, alt: `${movie.title} backdrop` }]
            : [];

        return {
            title,
            description,
            alternates: {
                canonical: `/movies/${id}`,
            },
            openGraph: {
                title: movie.title,
                description,
                type: 'video.movie',
                url: `/movies/${id}`,
                images: openGraphImages,
                siteName: 'Movie Library',
            },
            twitter: {
                card: 'summary_large_image',
                title: movie.title,
                description,
                images: backdropUrl ? [backdropUrl] : [],
            },
            keywords: [
                movie.title,
                'movie',
                'film',
                'cinema',
                ...movie.genres.map((g: { name: string }) => g.name),
            ],
        };
    } catch (error) {
        console.error('Failed to generate movie metadata', error);
        return {
            title: 'Movie Not Found - Movie Library',
            description: 'The requested movie could not be found.',
        };
    }
};

const getMovie = cache(async (id: string): Promise<MovieDetail> => {
    const api = TMDBApi();
    const data = await api.fetchMovieDetails(id);
    const validated = MovieDetailSchema.safeParse(data);

    if (!validated.success) {
        console.error('Movie validation failed:', validated.error);
        throw new Error('Invalid movie data');
    }

    return validated.data;
});

const MovieDetailPage = async ({ params }: DetailProps) => {
    const { id } = await params;

    return (
        <>
            <link rel="preconnect" href="https://image.tmdb.org" />
            <ScrollReset />
            <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-8 pt-6 pb-12">
                <BackButton href="/" label="Back to Movies" className="w-fit" />

                <Suspense fallback={<MovieDetailSkeleton />}>
                    <MovieDetailContent id={id} />
                </Suspense>
            </div>
        </>
    );
};

export default MovieDetailPage;
