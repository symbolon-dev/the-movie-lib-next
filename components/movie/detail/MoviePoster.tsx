import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { PosterImage } from '@/components/movie/shared/PosterImage';

type MoviePosterProps = {
    posterPath: string | undefined;
    title: string;
};

export const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <NeonGradientCard
            className="max-w-sm"
            neonColors={{
                firstColor: "#61DAFB",
                secondColor: "#E2E8F0"
            }}
        >
            <PosterImage
                path={posterPath}
                title={title}
                fallbackText="No poster available"
                sizes="(max-width: 768px) 100vw, 400px"
            />
        </NeonGradientCard>
    );
};
