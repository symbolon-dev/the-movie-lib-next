import { MovieHero } from '@/components/movie/movie-detail/movie-hero';
import { MovieInfo } from '@/components/movie/movie-detail/movie-info';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { getMovie } from '@/lib/movie-detail';

type MovieDetailContentProps = {
    id: string;
};

export const MovieDetailContent = async ({ id }: MovieDetailContentProps) => {
    const movie = await getMovie(id);

    return (
        <NeonGradientCard
            className="rounded-3xl"
            contentclassname="border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10"
            neonColors={{
                firstColor: 'var(--color-chart-1)',
                secondColor: 'var(--color-card)',
            }}
        >
            <div className="flex flex-col gap-10">
                <MovieHero
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
    );
};
