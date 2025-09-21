import { BackButton } from '@/components/common/navigation/BackButton';

type MovieHeaderProps = {
    title: string;
    tagline: string | undefined;
    backdropPath: string | undefined;
};

export const MovieHeader = ({ title, tagline }: MovieHeaderProps) => {
    return (
        <>
            <BackButton href="/" label="Back" className="mb-6" />

            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">{title}</h1>
                {tagline && (
                    <p className="text-muted-foreground text-lg italic">{`"${tagline}"`}</p>
                )}
            </div>
        </>
    );
};
