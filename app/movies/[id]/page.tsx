import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BackButton } from '@/components/common/navigation/BackButton';
import { ScrollReset } from '@/components/common/navigation/ScrollReset';
import { MovieHeader } from '@/components/movie/detail/MovieHeader';
import { MovieInfo } from '@/components/movie/detail/MovieInfo';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { MovieDetailSchema } from '@/schemas/movie';
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

        return {
            title,
            description,
            openGraph: {
                title: movie.title,
                description,
                type: 'video.movie',
                images: backdropUrl
                    ? [
                          {
                              url: backdropUrl,
                              width: 1280,
                              height: 720,
                              alt: `${movie.title} backdrop`,
                          },
                      ]
                    : [],
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

const getMovie = async (id: string) => {
    try {
        const api = TMDBApi();
        const data = await api.fetchMovieDetails(id);
        const validated = MovieDetailSchema.safeParse(data);

        if (!validated.success) {
            console.error('Movie validation failed:', validated.error);
            throw new Error('Invalid movie data');
        }

        return validated.data;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
        throw error;
    }
};

const MovieDetailPage = async ({ params }: DetailProps) => {
    const { id } = await params;
    if (!id) {
        notFound();
    }

    const movie = await getMovie(id);
    if (!movie) {
        notFound();
    }

    return (
        <>
            <link rel="preconnect" href="https://image.tmdb.org" />
            <ScrollReset />
            <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-8 pt-6 pb-12">
                <BackButton href="/" label="Back to Movies" className="w-fit" />

                <NeonGradientCard
                    className="rounded-3xl"
                    contentClassName="border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10"
                    neonColors={{
                        firstColor: 'var(--color-chart-1)',
                        secondColor: 'var(--color-card)',
                    }}
                >
                    <div className="flex flex-col gap-10">
                        <MovieHeader
                            title={movie.title}
                            tagline={movie.tagline}
                            posterPath={movie.poster_path}
                            voteAverage={movie.vote_average}
                            voteCount={movie.vote_count}
                            releaseDate={movie.release_date}
                            runtime={movie.runtime}
                            genres={movie.genres}
                            homepage={movie.homepage}
                            imdbId={movie.imdb_id}
                        />

                        <hr className="border-border/60" />

                        <MovieInfo
                            overview={movie.overview}
                            productionCompanies={movie.production_companies}
                            productionCountries={movie.production_countries}
                            spokenLanguages={movie.spoken_languages}
                            budget={movie.budget}
                            revenue={movie.revenue}
                        />
                    </div>
                </NeonGradientCard>
            </div>
        </>
    );
};

export default MovieDetailPage;
