'use client';

import { AlertTriangle, ArrowLeft, Home, RotateCcw } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type ErrorBoundaryProps = {
    error: Error & { digest?: string };
    reset: () => void;
    title?: string;
    message?: string;
    showBackButton?: boolean;
    variant?: 'page' | 'section';
};

export const ServerErrorBoundary = ({
    error,
    reset,
    title = 'Something went wrong',
    message = 'An unexpected error occurred while loading the page.',
    showBackButton = false,
    variant = 'page',
}: ErrorBoundaryProps) => {
    const containerClass =
        variant === 'page'
            ? 'flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4'
            : 'from-muted to-card flex min-h-[calc(100dvh-5rem)] flex-col bg-gradient-to-b py-10';

    return (
        <div className={containerClass}>
            {showBackButton && variant === 'section' && (
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            )}

            <div className={variant === 'section' ? 'flex flex-1 items-center justify-center' : ''}>
                <Alert variant="destructive" className="max-w-lg">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>
                        <p className="text-body mb-4">{message}</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={reset}
                                className="flex items-center gap-2"
                            >
                                <RotateCcw className="h-3 w-3" />
                                Try again
                            </Button>
                            {showBackButton && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    Go back
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => (window.location.href = '/')}
                                className="flex items-center gap-2"
                            >
                                <Home className="h-3 w-3" />
                                {variant === 'page' ? 'Go home' : 'Home'}
                            </Button>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-4">
                                <summary className="text-body-sm cursor-pointer font-medium">
                                    Error details (dev only)
                                </summary>
                                <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                                    {error.message}
                                    {error.stack}
                                </pre>
                            </details>
                        )}
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};
