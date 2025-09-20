'use client';

import { useEffect } from 'react';
import { AlertTriangle, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/common/navigation/BackButton';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function MovieError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('Movie detail error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <BackButton href="/" label="Back to Movies" className="mb-6" />

                <div className="flex items-center justify-center">
                    <Alert variant="destructive" className="max-w-lg">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Failed to load movie</AlertTitle>
                        <AlertDescription>
                            <p className="mb-4">
                                We couldn't load the movie details. This might be due to an invalid movie ID or a temporary server issue.
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
                                    onClick={() => window.location.href = '/'}
                                    className="flex items-center gap-2"
                                >
                                    <Home className="h-3 w-3" />
                                    Home
                                </Button>
                            </div>
                            {process.env.NODE_ENV === 'development' && (
                                <details className="mt-4">
                                    <summary className="cursor-pointer text-sm font-medium">
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
        </div>
    );
}