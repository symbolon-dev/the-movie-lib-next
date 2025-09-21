import { Star } from 'lucide-react';

type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
};

export const MovieRating = ({ voteAverage, voteCount }: MovieRatingProps) => {
    return (
        <div className="flex items-center gap-2">
            <Star className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">{voteAverage.toFixed(1)}/10</span>
            {voteCount > 0 && (
                <span className="text-muted-foreground text-sm">({voteCount} votes)</span>
            )}
        </div>
    );
};
