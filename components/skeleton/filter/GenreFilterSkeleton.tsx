import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type GenreFilterSkeletonProps = {
    className?: string;
    count?: number;
};

// Realistic genre name lengths for better skeleton appearance
const GENRE_WIDTHS = [65, 85, 45, 95, 75, 105, 55, 80, 70, 90, 60, 100, 85, 75, 95, 65, 110, 50, 85, 70];

export const GenreFilterSkeleton = ({ className = '', count = 19 }: GenreFilterSkeletonProps) => {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-[22px] rounded-full px-3 py-1"
                    style={{ width: `${GENRE_WIDTHS[index % GENRE_WIDTHS.length]}px` }}
                />
            ))}
        </div>
    );
};