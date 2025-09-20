import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type EmptyStateProps = {
    title: string;
    message: string;
    className?: string;
};

export const EmptyState = ({ title, message, className = '' }: EmptyStateProps) => {
    return (
        <Card className={`flex size-full flex-col items-center justify-center p-8 ${className}`}>
            <CardContent className="flex flex-col items-center justify-center space-y-2 p-0">
                <h2 className="text-xl font-bold text-foreground">{title}</h2>
                <p className="text-muted-foreground">{message}</p>
            </CardContent>
        </Card>
    );
};
