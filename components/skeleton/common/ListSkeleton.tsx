import { Card, CardContent, Skeleton } from '@/components/ui';

type ListSkeletonProps = {
    count?: number;
    className?: string;
};

const ListSkeleton = ({ count = 8, className }: ListSkeletonProps) => {
    return (
        <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className || ''}`}>
            {Array.from({ length: count }, (_, index) => (
                <Card key={index} className="flex flex-col overflow-hidden">
                    <Skeleton className="relative flex aspect-[2/3]" />
                    <CardContent className="flex flex-1 flex-col space-y-3 p-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ListSkeleton;