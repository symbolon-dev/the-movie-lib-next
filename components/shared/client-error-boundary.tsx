'use client';

import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorMessage } from './error-message';

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};

export const ClientErrorBoundary = ({ children, fallback }: Props) => (
    <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
            if (fallback) {
                return <>{fallback}</>;
            }

            return <ErrorMessage error={error} onRetry={resetErrorBoundary} />;
        }}
        onError={(error) => {
            console.error('ClientErrorBoundary caught error:', error);
        }}
    >
        {children}
    </ErrorBoundary>
);
