import * as React from 'react';

import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => (
    <div
        className={cn(
            'bg-card text-card-foreground border-border rounded-xl border shadow',
            className,
        )}
        {...props}
    />
);
Card.displayName = 'Card';

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

type CardTitleProps = React.HTMLAttributes<HTMLDivElement>;

const CardTitle = ({ className, ...props }: CardTitleProps) => (
    <div className={cn('leading-none font-semibold tracking-tight', className)} {...props} />
);
CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
    <div className={cn('text-muted-foreground text-sm', className)} {...props} />
);
CardDescription.displayName = 'CardDescription';

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = ({ className, ...props }: CardContentProps) => (
    <div className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = ({ className, ...props }: CardFooterProps) => (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
