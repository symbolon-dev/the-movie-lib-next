import { GenreFilterSkeleton } from '@/components/skeleton/filter/GenreFilterSkeleton';
import { MagicCard } from '@/components/ui/magic-card';
import { Skeleton } from '@/components/ui/skeleton';

export const MovieFilterSkeleton = () => {
    return (
        <MagicCard gradientColor="#61DAFB55" className="h-fit p-6">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="relative">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                <div className="border-border border-t pt-4">
                    <Skeleton className="mb-3 h-4 w-16" />
                    <GenreFilterSkeleton />
                </div>

                <div className="border-border border-t pt-4">
                    <Skeleton className="mb-3 h-4 w-16" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="border-border border-t pt-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </MagicCard>
    );
};
