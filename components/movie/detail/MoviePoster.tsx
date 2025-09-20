import { PosterImage } from '@/components/movie/shared/PosterImage';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

export const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <div className="overflow-hidden rounded-lg bg-muted shadow-xl shadow-primary/20 border-2 border-primary">
            <PosterImage
                path={posterPath}
                title={title}
                fallbackText="No poster available"
                sizes="(max-width: 768px) 100vw, 400px"
            />
        </div>
    );
};
