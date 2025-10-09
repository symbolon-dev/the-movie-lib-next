'use client';

import { ServerErrorBoundary } from '@/components/shared/server-error-boundary';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const MovieError = ({ error, reset }: ErrorProps) => {
    return (
        <ServerErrorBoundary
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
