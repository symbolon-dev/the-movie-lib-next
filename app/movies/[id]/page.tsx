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

export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
    try {
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : (process.env.NEXT_APP_URL ?? 'http://localhost:3003');

        const response = await fetch(
            `${baseUrl}/api/movies/discover?sort_by=popularity.desc&page=1`,
            { cache: 'force-cache' },
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return (
            data.results?.slice(0, 25).map((movie: { id: number }) => ({
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
            next: { revalidate: 86400 },
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
        <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-10 py-10">
            <MovieHeader
                title={movie.title}
                tagline={movie.tagline}
                backdropPath={movie.backdrop_path}
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
                <div className="lg:self-start">
                    <MoviePoster posterPath={movie.poster_path} title={movie.title} />
                </div>

                <div className="text-foreground lg:col-start-2">
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-center sm:justify-start sm:text-left">
                        <MovieRating voteAverage={movie.vote_average} voteCount={movie.vote_count} />

                        <MovieMetadata releaseDate={movie.release_date} runtime={movie.runtime} />
                    </div>

                    <MovieGenres genres={movie.genres} />

                    <hr className="border-border/60 mb-8" />

                    <MovieInfo
                        overview={movie.overview}
                        productionCompanies={movie.production_companies}
                        productionCountries={movie.production_countries}
                        spokenLanguages={movie.spoken_languages}
                        budget={movie.budget}
                        revenue={movie.revenue}
                    />

                    <hr className="border-border/60 mt-10 mb-6" />

                    <MovieLinks homepage={movie.homepage} imdbId={movie.imdb_id} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
