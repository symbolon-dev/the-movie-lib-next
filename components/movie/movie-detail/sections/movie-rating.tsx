import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
    className?: string;
    iconClassName?: string;
    voteCountClassName?: string;
};

export const MovieRating = ({
    voteAverage,
    voteCount,
    className,
    iconClassName,
    voteCountClassName,
}: MovieRatingProps) => (
    <div className={cn('flex flex-wrap items-center gap-2 text-base sm:text-lg', className)}>
        <Star className={cn('h-4 w-4', iconClassName)} aria-hidden="true" />
        <span className="font-semibold">{voteAverage.toFixed(1)}/10</span>
        {voteCount > 0 ? (
            <span className={cn('text-muted-foreground text-sm sm:text-base', voteCountClassName)}>
                ({new Intl.NumberFormat().format(voteCount)} votes)
            </span>
        ) : null}
    </div>
);
