
type MovieCardSkeletonProps = {
    className?: string;
};

const MovieCardSkeleton = ({ className = '' }: MovieCardSkeletonProps) => {
    return (
        <div className={`group relative ${className}`}>
            {/* Main card skeleton with gradient shimmer */}
            <div className="relative h-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg">
                {/* Poster area with shimmer effect */}
                <div className="aspect-[2/3] w-full relative bg-gradient-to-br from-muted/40 via-muted/60 to-muted/40">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/20 to-transparent animate-pulse" />

                    {/* Fake poster reflection */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Hidden content that appears on hover (like real cards) */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full px-5 pb-6 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="space-y-3">
                        {/* Title skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 w-4/5 animate-pulse rounded bg-muted/60" />
                            <div className="h-4 w-3/5 animate-pulse rounded bg-muted/60" />
                        </div>

                        {/* Year and rating skeleton */}
                        <div className="flex items-center justify-between">
                            <div className="h-3 w-12 animate-pulse rounded bg-muted/60" />
                            <div className="flex items-center gap-1">
                                <div className="h-3 w-3 animate-pulse rounded bg-muted/60" />
                                <div className="h-3 w-8 animate-pulse rounded bg-muted/60" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { MovieCardSkeleton };