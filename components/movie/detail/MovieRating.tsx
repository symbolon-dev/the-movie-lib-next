'use client';

import { RatingDisplay } from '@/components/movie/shared/RatingDisplay';

type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
};

export const MovieRating = ({ voteAverage, voteCount }: MovieRatingProps) => {
    return <RatingDisplay score={voteAverage} showCount={true} count={voteCount} size="lg" />;
};
