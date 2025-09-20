import { notFound } from 'next/navigation';
import { MovieGenres } from '@/components/movie/detail/MovieGenres';
import { MovieHeader } from '@/components/movie/detail/MovieHeader';
import { MovieInfo } from '@/components/movie/detail/MovieInfo';
import { MovieLinks } from '@/components/movie/detail/MovieLinks';
import { MovieMetadata } from '@/components/movie/detail/MovieMetadata';
import { MoviePoster } from '@/components/movie/detail/MoviePoster';
import { MovieRating } from '@/components/movie/detail/MovieRating';

type DetailProps = {
    params: Promise<{ id: string }>;
};

const MOVIE_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours
export const revalidate = MOVIE_REVALIDATE_TIME;

export async function generateStaticParams() {
    try {
        const origin = process.env.NEXT_APP_URL ?? 'http://localhost:3000';
        const response = await fetch(
            `${origin}/api/movies/discover?sort_by=popularity.desc&page=1`,
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return (
            data.results?.slice(0, 20).map((movie: { id: number }) => ({
                id: movie.id.toString(),
            })) || []
        );
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

const getMovie = async (id: string) => {
    try {
        const origin = process.env.NEXT_APP_URL ?? 'http://localhost:3000';
        const url = `${origin}/api/movies/${id}`;

        const response = await fetch(url, {
            next: { revalidate: MOVIE_REVALIDATE_TIME },
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
                        <MoviePoster posterPath={movie.poster_path} title={movie.title} />
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

                        <MovieLinks homepage={movie.homepage} imdbId={movie.imdb_id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
