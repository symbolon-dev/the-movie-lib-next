import Image from 'next/image';
import BackButton from '../../../shared/common/BackButton';
import { getMovieBackdropUrl } from '@/lib/image';

type MovieHeaderProps = {
    title: string;
    tagline: string | undefined;
    backdropPath: string | undefined;
};

const MovieHeader = ({ title, tagline, backdropPath }: MovieHeaderProps) => {
    return (
        <>
            <BackButton
                href="/"
                label="Back to Movies"
                className="mb-6"
            />

            <div className="relative mb-10 h-[40vh] overflow-hidden rounded-xl md:h-[50vh]">
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
                    <div className="absolute inset-0 bg-gray-800"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
                        {title}
                    </h1>
                    {tagline && (
                        <p className="mb-4 text-xl italic text-gray-300">
                            {' '}
                            {`"${tagline}"`}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MovieHeader;
