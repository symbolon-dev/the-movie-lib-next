type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
};

export const MovieRating = ({ voteAverage, voteCount }: MovieRatingProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">★</span>
                <span className="text-xl font-semibold">{voteAverage.toFixed(1)}/10</span>
            </div>
            {voteCount > 0 && (
                <span className="text-muted-foreground text-sm">({voteCount} votes)</span>
            )}
        </div>
    );
};
