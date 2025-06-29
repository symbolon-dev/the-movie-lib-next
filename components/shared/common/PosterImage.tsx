import Image from 'next/image';
import { Film } from 'lucide-react';
import { getMoviePosterUrl } from '@/lib/image';

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

const PosterImage = ({
    path,
    title,
    aspectRatio = '2/3',
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    className = '',
    showFallback = true,
    fallbackText = 'No Image Available'
}: PosterImageProps) => {
    return (
        <div className={`relative ${aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : ''} ${className}`}>
            {path ? (
                <Image
                    src={getMoviePosterUrl(path, 'w500')}
                    alt={title}
                    fill
                    sizes={sizes}
                    className="object-cover"
                    priority={priority}
                />
            ) : showFallback ? (
                <div className="flex size-full items-center justify-center bg-gray-900 text-center text-gray-500">
                    <Film className="mr-2 h-6 w-6" />
                    <span>{fallbackText}</span>
                </div>
            ) : undefined}
        </div>
    );
};

export default PosterImage;
