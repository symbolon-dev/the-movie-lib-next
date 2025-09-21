import { notFound } from 'next/navigation';
import { ScrollToTop } from '@/components/common/navigation/ScrollToTop';
import { BackButton } from '@/components/common/navigation/BackButton';
import { MovieHeader } from '@/components/movie/detail/MovieHeader';
import { MovieInfo } from '@/components/movie/detail/MovieInfo';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

type DetailProps = {
    params: Promise<{ id: string }>;
};

const REVALIDATE_TIME = 60 * 60 * 24; // 24 hours

export const revalidate = REVALIDATE_TIME;

const getMovie = async (id: string) => {
    try {
        const API_KEY = process.env.TMDB_API_KEY;
        const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

        if (!API_KEY) {
            throw new Error('TMDB API key is not defined');
        }

        const response = await fetch(`${BASE_URL}/movie/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            next: { revalidate: REVALIDATE_TIME },
        });

        if (!response.ok) {
            throw new Error(`Error fetching movie: ${response.statusText}`);
        }

        return await response.json();
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
            <ScrollToTop />
            <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-8 pt-6 pb-12">
                <BackButton href="/" label="Back to Movies" className="w-fit" />

                <NeonGradientCard
                    className="rounded-3xl"
                    contentClassName="border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10 dark:bg-neutral-900"
                    neonColors={{ firstColor: 'var(--color-chart-1)', secondColor: 'var(--color-card)' }}
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
