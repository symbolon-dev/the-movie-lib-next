import * as React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('bg-primary/20 animate-pulse rounded-md', className)}
                {...props}
            />
        );
    },
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
