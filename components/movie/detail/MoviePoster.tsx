import { PosterImage } from '@/components/movie/shared/PosterImage';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

export const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <NeonGradientCard
            className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:sticky lg:top-28"
            neonColors={{
                firstColor: '#61DAFB',
                secondColor: '#E2E8F0',
            }}
        >
            <PosterImage
                path={posterPath}
                title={title}
                fallbackText="No poster available"
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-[18px]"
            />
        </NeonGradientCard>
    );
};
