import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CardSkeletonProps = {
    className?: string;
};

export const CardSkeleton = ({ className }: CardSkeletonProps) => {
    return (
        <Card
            className={cn(
                'border-primary/30 shadow-primary/10 relative h-full rounded-xl border shadow-lg',
                className,
            )}
        >
            <div className="relative h-full overflow-hidden rounded-xl">
                {/* Poster image skeleton with aspect ratio matching movie posters */}
                <Skeleton className="aspect-[2/3] w-full" />

                {/* Overlay content skeleton at bottom */}
                <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
                    <div className="space-y-3">
                        {/* Movie title skeleton - 2 lines max */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                        </div>

                        {/* Year and rating skeleton */}
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-12" />
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-3.5 w-3.5" />
                                <Skeleton className="h-4 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
