'use client';

import { ErrorBoundary } from '@/components/common/feedback/ErrorBoundary';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const MovieError = ({ error, reset }: ErrorProps) => {
    return (
        <ErrorBoundary
            error={error}
            reset={reset}
            title="Failed to load movie"
            message="We couldn't load the movie details. This might be due to an invalid movie ID or a temporary server issue."
            showBackButton
            variant="section"
        />
    );
};

export default MovieError;
