import PosterImage from '@/components/shared/common/PosterImage';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-xl">
            <PosterImage
                path={posterPath}
                title={title}
                fallbackText="No poster available"
                sizes="(max-width: 768px) 100vw, 400px"
            />
        </div>
    );
};

export default MoviePoster;
