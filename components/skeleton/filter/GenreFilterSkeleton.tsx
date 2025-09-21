import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type GenreFilterSkeletonProps = {
    className?: string;
    count?: number;
};

// Realistic genre name lengths for better skeleton appearance
const GENRE_WIDTHS = [
    65, 85, 45, 95, 75, 105, 55, 80, 70, 90, 60, 100, 85, 75, 95, 65, 110, 50, 85, 70,
];

export const GenreFilterSkeleton = ({ className = '', count = 19 }: GenreFilterSkeletonProps) => {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {Array.from({ length: count }).map((_, index) => {
                const width = GENRE_WIDTHS[index % GENRE_WIDTHS.length];
                return (
                    <Skeleton
                        key={index}
                        className="h-[26px] min-w-[72px] basis-[calc(50%-0.5rem)] rounded-full px-4 py-2 sm:basis-auto"
                        style={{ maxWidth: `${width}px`, flexGrow: 1 }}
                    />
                );
            })}
        </div>
    );
};
