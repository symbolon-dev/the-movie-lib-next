import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
        data-slot="skeleton"
        className={cn('bg-accent animate-pulse rounded-md', className)}
        {...props}
    />
);

type SkeletonProps = React.ComponentProps<'div'>;

export { Skeleton };
export type { SkeletonProps };
