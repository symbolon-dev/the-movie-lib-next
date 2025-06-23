import { notFound } from 'next/navigation';

import MovieHeader from '@/components/features/movies/detail/MovieHeader';
import MoviePoster from '@/components/features/movies/detail/MoviePoster';
import MovieRating from '@/components/features/movies/detail/MovieRating';
import MovieMetadata from '@/components/features/movies/detail/MovieMetadata';
import MovieGenres from '@/components/features/movies/detail/MovieGenres';
import MovieInfo from '@/components/features/movies/detail/MovieInfo';
import MovieLinks from '@/components/features/movies/detail/MovieLinks';

type DetailProps = {
    params: Promise<{ id: string }>;
}

const getMovie = async (id: string) => {
    try {
        const origin = process.env.NEXT_APP_URL ?? 'http://localhost:3000';
        const url = new URL(`/api/movies/${id}`, origin);

        const response = await fetch(url.toString(), {
            cache: 'no-store'
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
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <MovieHeader
                    title={movie.title}
                    tagline={movie.tagline}
                    backdropPath={movie.backdrop_path}
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <MoviePoster
                            posterPath={movie.poster_path}
                            title={movie.title}
                        />
                    </div>

                    <div className="text-white md:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center gap-6">
                            <MovieRating
                                voteAverage={movie.vote_average}
                                voteCount={movie.vote_count}
                            />

                            <MovieMetadata
                                releaseDate={movie.release_date}
                                runtime={movie.runtime}
                            />
                        </div>

                        <MovieGenres genres={movie.genres} />

                        <MovieInfo
                            overview={movie.overview}
                            productionCompanies={movie.production_companies}
                            productionCountries={movie.production_countries}
                            spokenLanguages={movie.spoken_languages}
                            budget={movie.budget}
                            revenue={movie.revenue}
                        />

                        <MovieLinks
                            homepage={movie.homepage}
                            imdbId={movie.imdb_id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
