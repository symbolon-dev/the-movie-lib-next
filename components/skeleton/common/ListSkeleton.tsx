import { CardSkeleton } from '@/components/skeleton/common/CardSkeleton';
import { cn } from '@/lib/utils';

type ListSkeletonProps = {
    count?: number;
    className?: string;
};

const ListSkeleton = ({ count = 32, className }: ListSkeletonProps) => {
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

export { ListSkeleton };
