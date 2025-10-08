'use client';

import { ServerErrorBoundary } from '@/components/common/feedback/ServerErrorBoundary';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
    return <ServerErrorBoundary error={error} reset={reset} variant="page" />;
};

export default Error;
