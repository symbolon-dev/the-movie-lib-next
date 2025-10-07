import * as React from 'react';

import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return <div className={cn('bg-primary/20 animate-pulse rounded-md', className)} {...props} />;
};

Skeleton.displayName = 'Skeleton';

export { Skeleton };
