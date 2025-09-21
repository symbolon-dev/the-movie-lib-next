//TODO: Replace colors with Tailwind CSS variables

import { PosterImage } from '@/components/movie/shared/PosterImage';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <NeonGradientCard
            className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:sticky lg:top-28"
            neonColors={{
                firstColor: 'oklch(0.8 0.15 195)',
                secondColor: 'oklch(0.93 0.01 240)',
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

export { MoviePoster };
