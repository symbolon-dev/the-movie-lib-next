import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

type EmptyStateProps = {
    title: string;
    message: string;
    className?: string;
};

const EmptyState = ({ title, message, className = '' }: EmptyStateProps) => {
    return (
        <Card className={`flex size-full flex-col items-center justify-center p-8 ${className}`}>
            <CardContent className="flex flex-col items-center justify-center space-y-2 p-0">
                <h2 className="heading-3 text-foreground">{title}</h2>
                <p className="text-body text-muted-foreground">{message}</p>
            </CardContent>
        </Card>
    );
};

export { EmptyState };
