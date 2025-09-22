'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
    useEffect(() => {
        console.error('App error:', error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
            <Alert variant="destructive" className="max-w-lg">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                    <p className="text-body mb-4">
                        An unexpected error occurred while loading the page.
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
                            onClick={() => (window.location.href = '/')}
                            className="flex items-center gap-2"
                        >
                            <Home className="h-3 w-3" />
                            Go home
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
    );
};

export default Error;
