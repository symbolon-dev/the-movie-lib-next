'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/ui/magic-card';

type ErrorMessageProps = {
    error: string;
    fullPage?: boolean;
    title?: string;
    actionLink?: string;
    actionText?: string;
    onRetry?: () => void;
    showRetry?: boolean;
};

const ErrorMessage = ({
    error,
    fullPage = false,
    title = 'Error',
    actionLink = '/',
    actionText = 'Back to Home',
    onRetry,
    showRetry = true,
}: ErrorMessageProps) => {
    if (!error) return undefined;

    if (!fullPage) {
        return (
            <Alert variant="destructive" className="my-4">
                <div className="flex items-center justify-between">
                    <AlertDescription className="flex-1">{error}</AlertDescription>
                    {onRetry && showRetry && (
                        <Button variant="outline" size="sm" onClick={onRetry} className="ml-4 h-8">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Retry
                        </Button>
                    )}
                </div>
            </Alert>
        );
    }

    return (
        <div className="from-background to-muted/50 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
            <MagicCard
                gradientColor="var(--color-destructive)"
                className="w-full max-w-lg p-12 text-center"
            >
                <div className="space-y-6">
                    <div className="relative">
                        <div className="bg-destructive/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full p-6">
                            <AlertTriangle className="text-destructive h-12 w-12" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-foreground font-serif text-3xl font-bold">{title}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {error || 'There was an error loading the data.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
                        {onRetry && showRetry && (
                            <Button
                                onClick={onRetry}
                                className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                        )}
                        <Button
                            asChild
                            variant={onRetry && showRetry ? 'outline' : 'default'}
                            className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                        >
                            <Link href={actionLink}>{actionText}</Link>
                        </Button>
                    </div>
                </div>
            </MagicCard>
        </div>
    );
};

export { ErrorMessage };
