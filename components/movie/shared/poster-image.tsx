import { Film } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { getMoviePosterUrl } from '@/utils/image';

type PosterImageProps = {
    path: string | null;
    title: string;
    aspectRatio?: '2/3' | 'auto';
    priority?: boolean;
    sizes?: string;
    className?: string;
    showFallback?: boolean;
    fallbackText?: string;
};

export const PosterImage = ({
    path,
    title,
    aspectRatio = '2/3',
    priority = false,
    sizes = '(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 200px, 240px',
    className = '',
    showFallback = true,
    fallbackText = 'No Image Available',
}: PosterImageProps) => (
    <div
        className={cn(
            'relative overflow-hidden rounded-xl',
            aspectRatio === '2/3' && 'aspect-2/3',
            className,
        )}
    >
        {path != null
            ? (
                    <Image
                        src={getMoviePosterUrl(path, 'w342')}
                        alt={`Movie poster for ${title}`}
                        fill
                        sizes={sizes}
                        className="object-cover"
                        priority={priority}
                        quality={85}
                    />
                )
            : (
                    showFallback && (
                        <div
                            className={`
                                flex size-full items-center justify-center
                                bg-gray-900 text-center text-gray-500
                            `}
                        >
                            <Film className="mr-2 h-6 w-6" />
                            <span>{fallbackText}</span>
                        </div>
                    )
                )}
    </div>
);
