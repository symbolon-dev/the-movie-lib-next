'use client';

import { useEffect } from 'react';
import { AlertTriangle, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { BackButton } from '@/components/common/navigation/BackButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const MovieError = ({ error, reset }: ErrorProps) => {
    useEffect(() => {
        console.error('Movie detail error:', error);
    }, [error]);

    return (
        <div className="from-muted to-card flex min-h-[calc(100dvh-5rem)] flex-col bg-gradient-to-b py-10">
            <div className="mb-8">
                <BackButton href="/" label="Back" className="w-fit" />
            </div>

            <div className="flex flex-1 items-center justify-center">
                <Alert variant="destructive" className="max-w-lg">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Failed to load movie</AlertTitle>
                    <AlertDescription>
                        <p className="text-body mb-4">
                            We couldn&apos;t load the movie details. This might be due to an invalid
                            movie ID or a temporary server issue.
                        </p>
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
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Go back
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => (window.location.href = '/')}
                                className="flex items-center gap-2"
                            >
                                <Home className="h-3 w-3" />
                                Home
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

export default MovieError;
