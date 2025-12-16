import { Skeleton } from '@/components/ui/skeleton';

export const MovieDetailSkeleton = () => (
    <div className={`
        border-border/60 bg-card space-y-8 rounded-3xl border p-6 shadow-sm
        sm:p-8
        lg:p-10
    `}
    >
        <div className={`
            grid gap-8
            lg:grid-cols-[240px_1fr]
        `}
        >
            <Skeleton className="aspect-2/3 w-full max-w-xs rounded-3xl" />

            <div className="space-y-6">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-10 w-44" />
                </div>
            </div>
        </div>

        <hr className="border-border/60" />

        <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    </div>
);
