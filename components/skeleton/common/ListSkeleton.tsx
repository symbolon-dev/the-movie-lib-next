import { CardSkeleton } from '@/components/skeleton/common/CardSkeleton';

type ListSkeletonProps = {
    count?: number;
    className?: string;
};

export const ListSkeleton = ({ count = 8, className }: ListSkeletonProps) => {
    return (
        <div
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className || ''}`}
        >
            {Array.from({ length: count }, (_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
};
