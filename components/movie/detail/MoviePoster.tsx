import { PosterImage } from '@/components/movie/shared/PosterImage';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

export const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <div className="bg-muted shadow-primary/20 border-primary overflow-hidden rounded-lg border-2 shadow-xl">
            <PosterImage
                path={posterPath}
                title={title}
                fallbackText="No poster available"
                sizes="(max-width: 768px) 100vw, 400px"
            />
        </div>
    );
};
