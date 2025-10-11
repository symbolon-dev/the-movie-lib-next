import { MovieGenres } from '@/components/movie/movie-detail/sections/movie-genres';
import { MovieLinks } from '@/components/movie/movie-detail/sections/movie-links';
import { MovieMetadata } from '@/components/movie/movie-detail/sections/movie-metadata';
import { MovieRating } from '@/components/movie/movie-detail/sections/movie-rating';
import { PosterImage } from '@/components/movie/shared/poster-image';
import type { MovieGenre } from '@/types/movie';

type MovieHeroProps = {
    title: string;
    tagline: string | null | undefined;
    posterPath: string | null | undefined;
    voteAverage: number;
    voteCount: number;
    releaseDate: string;
    runtime: number;
    genres: MovieGenre[];
    homepage: string | null | undefined;
    imdbId: string | null | undefined;
};

export const MovieHero = ({
    title,
    tagline,
    posterPath,
    voteAverage,
    voteCount,
    releaseDate,
    runtime,
    genres,
    homepage,
    imdbId,
}: MovieHeroProps) => {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start">
            <div className="w-full max-w-xs justify-self-center lg:justify-self-start">
                <PosterImage
                    path={posterPath}
                    title={title}
                    className="rounded-[24px] shadow-lg"
                    sizes="(max-width: 1024px) 240px, 280px"
                    fallbackText="No poster available"
                />
            </div>

            <div className="flex flex-col gap-6">
                <div className="space-y-3 text-center lg:text-left">
                    <h1 className="heading-1 text-foreground">{title}</h1>
                    {tagline && (
                        <p className="text-lead text-muted-foreground italic">
                            &ldquo;{tagline}&rdquo;
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-center lg:justify-start lg:text-left">
                    <MovieRating voteAverage={voteAverage} voteCount={voteCount} />

                    <MovieMetadata releaseDate={releaseDate} runtime={runtime} />
                </div>

                {genres.length > 0 && (
                    <MovieGenres
                        genres={genres}
                        className="mb-0"
                        badgeVariant="outline"
                        badgeClassName="border-border/60 bg-transparent"
                    />
                )}

                {(homepage || imdbId) && (
                    <MovieLinks
                        homepage={homepage}
                        imdbId={imdbId}
                        className="mt-4"
                        buttonGroupClassName="justify-center sm:justify-start"
                    />
                )}
            </div>
        </div>
    );
};
