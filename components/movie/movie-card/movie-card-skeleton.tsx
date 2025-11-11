type MovieCardSkeletonProps = {
    className?: string;
};

export const MovieCardSkeleton = ({ className = '' }: MovieCardSkeletonProps) => (
    <div className={`group relative ${className}`}>
        {/* Main card skeleton with gradient shimmer */}
        <div className="border-border/60 bg-card relative h-full overflow-hidden rounded-xl border shadow-lg">
            {/* Poster area with shimmer effect */}
            <div className="from-muted/40 via-muted/60 to-muted/40 relative aspect-2/3 w-full bg-linear-to-br">
                <div className="via-muted/20 absolute inset-0 animate-pulse bg-linear-to-r from-transparent to-transparent" />

                {/* Fake poster reflection */}
                <div className="from-background/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
            </div>

            {/* Hidden content that appears on hover (like real cards) */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full px-5 pb-6 transition-transform duration-300 group-hover:translate-y-0">
                <div className="space-y-3">
                    {/* Title skeleton */}
                    <div className="space-y-2">
                        <div className="bg-muted/60 h-4 w-4/5 animate-pulse rounded" />
                        <div className="bg-muted/60 h-4 w-3/5 animate-pulse rounded" />
                    </div>

                    {/* Year and rating skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="bg-muted/60 h-3 w-12 animate-pulse rounded" />
                        <div className="flex items-center gap-1">
                            <div className="bg-muted/60 h-3 w-3 animate-pulse rounded" />
                            <div className="bg-muted/60 h-3 w-8 animate-pulse rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
