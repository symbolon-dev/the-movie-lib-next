import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CardSkeletonProps = {
    className?: string;
};

const CardSkeleton = ({ className }: CardSkeletonProps) => {
    return (
        <Card
            className={cn(
                'border-primary/30 shadow-primary/10 relative h-full rounded-xl border shadow-lg',
                className,
            )}
        >
            <div className="relative h-full overflow-hidden rounded-xl">
                <Skeleton className="aspect-[2/3] w-full" />

                <div className="from-background/90 via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-5 sm:pb-6">
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-14" />
                            <div className="flex items-center gap-1.5">
                                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export { CardSkeleton };
