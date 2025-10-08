'use client';

import { ErrorBoundary } from '@/components/common/feedback/ErrorBoundary';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
    return <ErrorBoundary error={error} reset={reset} variant="page" />;
};

export default Error;
