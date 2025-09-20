import { Card, CardContent, Skeleton } from '@/components/ui';

type CardSkeletonProps = {
    className?: string;
};

const CardSkeleton = ({ className }: CardSkeletonProps) => {
    return (
        <Card className={className}>
            <Skeleton className="relative flex aspect-[2/3]" />
            <CardContent className="flex flex-1 flex-col space-y-3 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </CardContent>
        </Card>
    );
};

export default CardSkeleton;