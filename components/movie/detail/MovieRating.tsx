import { Star } from 'lucide-react';

type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
};

export const MovieRating = ({ voteAverage, voteCount }: MovieRatingProps) => {
    return (
        <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg">
            <Star className="h-4 w-4" aria-hidden="true" />
            <span className="font-semibold">{voteAverage.toFixed(1)}/10</span>
            {voteCount > 0 && (
                <span className="text-muted-foreground text-sm sm:text-base">
                    ({new Intl.NumberFormat().format(voteCount)} votes)
                </span>
            )}
        </div>
    );
};
