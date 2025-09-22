import { Film } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

import { getMoviePosterUrl } from '@/utils/image';

type PosterImageProps = {
    path: string | undefined;
    title: string;
    aspectRatio?: '2/3' | 'auto';
    priority?: boolean;
    sizes?: string;
    className?: string;
    showFallback?: boolean;
    fallbackText?: string;
};

const PosterImage = memo(
    ({
        path,
        title,
        aspectRatio = '2/3',
        priority = false,
        sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        className = '',
        showFallback = true,
        fallbackText = 'No Image Available',
    }: PosterImageProps) => {
        return (
            <div
                className={`relative overflow-hidden rounded-xl ${aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : ''} ${className}`}
            >
                {path ? (
                    <Image
                        src={getMoviePosterUrl(path, 'w500')}
                        alt={`Movie poster for ${title}`}
                        fill
                        sizes={sizes}
                        className="object-cover"
                        priority={priority}
                    />
                ) : showFallback ? (
                    <div
                        className="flex size-full items-center justify-center bg-gray-900 text-center text-gray-500"
                        role="img"
                        aria-label={`${fallbackText} for ${title}`}
                    >
                        <Film className="mr-2 h-6 w-6" aria-hidden="true" />
                        <span>{fallbackText}</span>
                    </div>
                ) : undefined}
            </div>
        );
    },
);

PosterImage.displayName = 'PosterImage';

export { PosterImage };
