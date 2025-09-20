import Image from 'next/image';
import { BackButton } from '@/components/common/navigation/BackButton';
import { getMovieBackdropUrl } from '@/utils/image';

type MovieHeaderProps = {
    title: string;
    tagline: string | undefined;
    backdropPath: string | undefined;
};

export const MovieHeader = ({ title, tagline, backdropPath }: MovieHeaderProps) => {
    return (
        <>
            <BackButton href="/" label="Back" className="mb-6" />

            <div className="border-primary shadow-primary/20 relative mb-10 h-[40vh] overflow-hidden rounded-xl border-2 shadow-xl md:h-[50vh]">
                {backdropPath ? (
                    <div className="absolute inset-0">
                        <Image
                            src={getMovieBackdropUrl(backdropPath, 'original')}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80"></div>
                    </div>
                ) : (
                    <div className="bg-muted absolute inset-0"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">{title}</h1>
                    {tagline && (
                        <p className="mb-4 text-xl text-gray-300 italic"> {`"${tagline}"`}</p>
                    )}
                </div>
            </div>
        </>
    );
};
