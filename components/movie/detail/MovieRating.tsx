'use client';

import { RatingDisplay } from '@/components/movie';

type MovieRatingProps = {
    voteAverage: number;
    voteCount: number;
};

const MovieRating = ({ voteAverage, voteCount }: MovieRatingProps) => {
    return <RatingDisplay score={voteAverage} showCount={true} count={voteCount} size="lg" />;
};

export default MovieRating;
