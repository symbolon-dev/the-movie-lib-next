import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
        data-slot="skeleton"
        className={cn('bg-accent animate-pulse rounded-md', className)}
        {...props}
    />
);

export type SkeletonProps = React.ComponentProps<'div'>;
