'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ErrorMessageProps = {
    error: string;
    fullPage?: boolean;
    title?: string;
    actionLink?: string;
    actionText?: string;
};

export const ErrorMessage = ({
    error,
    fullPage = false,
    title = 'Error',
    actionLink = '/',
    actionText = 'Back to Home',
}: ErrorMessageProps) => {
    if (!error) return undefined;

    if (!fullPage) {
        return (
            <Alert variant="destructive" className="my-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="bg-background flex min-h-screen items-center justify-center">
            <Card className="max-w-md p-8 text-center">
                <Info className="text-destructive mx-auto mb-4 h-16 w-16" />
                <h2 className="text-foreground mb-2 text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground mb-6">
                    {error || 'There was an error loading the data.'}
                </p>
                <Button asChild>
                    <Link href={actionLink}>{actionText}</Link>
                </Button>
            </Card>
        </div>
    );
};
