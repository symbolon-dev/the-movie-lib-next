'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline:
                    'border border-input bg-transparent shadow-sm hover:bg-primary/10 hover:border-primary hover:text-accent-foreground',
            },
            size: {
                default: 'h-9 px-2 min-w-9',
                sm: 'h-8 px-1.5 min-w-8',
                lg: 'h-10 px-2.5 min-w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>;

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
    <TogglePrimitive.Root className={cn(toggleVariants({ variant, size, className }))} {...props} />
);
Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
