'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                'outline-primary':
                    'border border-primary text-primary bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
                fab: 'rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
                'icon-sm': 'size-8',
                'icon-lg': 'size-10',
                fab: 'h-14 w-14 rounded-full text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonAnimation = 'default' | 'subtle' | 'back' | 'float' | 'none';

const animationConfigs: Record<ButtonAnimation, any> = {
    default: {
        whileHover: {
            scale: [1, 1.05, 1.02, 1.05],
            rotate: [0, 2, -1, 0],
            boxShadow: [
                '0 2px 4px rgba(0, 0, 0, 0.1)',
                '0 8px 25px rgba(59, 130, 246, 0.4)',
                '0 12px 35px rgba(59, 130, 246, 0.6)',
                '0 15px 40px rgba(59, 130, 246, 0.3)',
            ],
            filter: 'brightness(1.1) saturate(1.2)',
            transition: {
                duration: 0.6,
                ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
                times: [0, 0.3, 0.6, 1],
            },
        },
        whileTap: {
            scale: 0.92,
            rotate: -2,
            filter: 'brightness(0.9)',
            transition: { duration: 0.1 },
        },
        initial: {
            scale: 1,
            rotate: 0,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            filter: 'brightness(1)',
        },
    },
    subtle: {
        whileHover: {
            scale: 1.02,
            transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
        },
        whileTap: {
            scale: 0.98,
            transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
        },
        initial: { scale: 1 },
    },
    back: {
        whileHover: {
            transform: 'translateX(-2px)',
            transition: { ease: [0, 0, 1, 1] as [number, number, number, number], duration: 0.1 },
        },
        whileTap: {
            transform: 'translateX(-4px)',
            transition: { ease: [0, 0, 1, 1] as [number, number, number, number], duration: 0.05 },
        },
        initial: { transform: 'translateX(0px)' },
    },
    float: {
        initial: {
            scale: 1,
            y: 0,
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.25)',
        },
        animate: {
            y: [-4, 0, -4],
            transition: {
                duration: 2.2,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
            },
        },
        whileHover: {
            scale: 1.08,
            y: -6,
            transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
        },
        whileTap: {
            scale: 0.95,
            transition: { duration: 0.1 },
        },
    },
    none: {},
};

type MotionConflicts = 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart';

type ButtonProps = Omit<React.ComponentProps<'button'>, MotionConflicts> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        animationType?: ButtonAnimation;
    };

export const Button = ({
    className,
    variant,
    size,
    asChild = false,
    disabled,
    animationType = 'default',
    ...props
}: ButtonProps) => {
    const mergedClassName = cn(buttonVariants({ variant, size, className }));
    const resolvedAnimation: ButtonAnimation = disabled ? 'none' : animationType;
    const animationProps = animationConfigs[resolvedAnimation];

    if (asChild) {
        return resolvedAnimation !== 'none' ? (
            <motion.div className="inline-block" tabIndex={-1} {...animationProps}>
                <Slot data-slot="button" className={mergedClassName} {...props} />
            </motion.div>
        ) : (
            <Slot data-slot="button" className={mergedClassName} {...props} />
        );
    }

    if (resolvedAnimation === 'none') {
        return (
            <button data-slot="button" className={mergedClassName} disabled={disabled} {...props} />
        );
    }

    return (
        <motion.button
            data-slot="button"
            className={mergedClassName}
            {...animationProps}
            {...props}
        />
    );
};

Button.displayName = 'Button';
