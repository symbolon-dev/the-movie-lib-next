import { CardSkeleton } from '@/components/skeleton/common/CardSkeleton';
import { cn } from '@/lib/utils';

type ListSkeletonProps = {
    count?: number;
    className?: string;
};

export const ListSkeleton = ({ count = 25, className }: ListSkeletonProps) => {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
                className,
            )}
        >
            {Array.from({ length: count }, (_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
};
