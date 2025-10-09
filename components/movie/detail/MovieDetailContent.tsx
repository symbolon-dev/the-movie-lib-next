import { cache } from 'react';

import { MovieHeader } from '@/components/movie/detail/MovieHeader';
import { MovieInfo } from '@/components/movie/detail/MovieInfo';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { MovieDetailSchema } from '@/schemas/movie';
import type { MovieDetail } from '@/types/movie';
import { TMDBApi } from '@/utils/api';

type MovieDetailContentProps = {
    id: string;
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

export const MovieDetailContent = async ({ id }: MovieDetailContentProps) => {
    const movie = await getMovie(id);

    return (
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
    );
};