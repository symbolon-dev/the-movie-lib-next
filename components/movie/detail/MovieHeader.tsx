import Image from 'next/image';
import { BackButton } from '@/components/common/navigation/BackButton';
import { getMovieBackdropUrl } from '@/utils/image';

type MovieHeaderProps = {
    title: string;
    tagline: string | undefined;
    backdropPath: string | undefined;
};

export const MovieHeader = ({ title, tagline, backdropPath }: MovieHeaderProps) => {
    const backdropUrl = backdropPath ? getMovieBackdropUrl(backdropPath, 'w1280') : undefined;

    return (
        <header className="mb-10">
            <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0">
                    {backdropUrl ? (
                        <Image
                            src={backdropUrl}
                            alt={`${title} backdrop`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="from-primary/40 to-secondary/40 h-full w-full bg-gradient-to-br via-transparent" />
                    )}
                    <div className="from-background via-background/80 to-background/30 absolute inset-0 bg-gradient-to-t" />
                </div>

                <div className="absolute top-6 left-6 z-20 sm:top-10 sm:left-10">
                    <BackButton
                        href="/"
                        label="Back"
                        className="shadow-background/20 shadow-lg backdrop-blur-sm"
                    />
                </div>

                <div className="relative z-10 px-6 py-16 sm:px-10 md:px-16 lg:py-24">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>
                        {tagline && (
                            <p className="text-muted-foreground text-lg italic sm:text-xl">
                                &ldquo;{tagline}&rdquo;
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
