import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
        variants: {
            variant: {
                default: 'bg-card text-card-foreground',
                destructive:
                    'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export const Alert = ({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) => (
    <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
);

export const AlertTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
        data-slot="alert-title"
        className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
        {...props}
    />
);

export const AlertDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
        data-slot="alert-description"
        className={cn(
            'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
            className,
        )}
        {...props}
    />
);

export type AlertProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants>;
export type AlertTitleProps = React.ComponentProps<'div'>;
export type AlertDescriptionProps = React.ComponentProps<'div'>;
