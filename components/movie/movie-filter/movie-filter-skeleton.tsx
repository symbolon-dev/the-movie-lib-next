import { Skeleton } from '@/components/ui/skeleton';

export const MovieFilterSkeleton = () => {
    return (
        <div className="h-fit rounded-xl border p-6">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
};
