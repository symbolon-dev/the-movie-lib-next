'use client';

import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { motion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    `
        focus-visible:border-ring focus-visible:ring-ring/50
        focus-visible:ring-[3px]
        aria-invalid:ring-destructive/20 aria-invalid:border-destructive
        dark:aria-invalid:ring-destructive/40
        inline-flex shrink-0 cursor-pointer items-center justify-center gap-2
        rounded-md text-sm font-medium whitespace-nowrap transition-all
        outline-none
        disabled:pointer-events-none disabled:opacity-50
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*=\'size-\'])]:size-4
    `,
    {
        variants: {
            variant: {
                'default':
                    `
                        bg-primary text-primary-foreground
                        hover:bg-primary/90
                    `,
                'destructive':
                    `
                        bg-destructive text-white
                        hover:bg-destructive/90
                        focus-visible:ring-destructive/20
                        dark:focus-visible:ring-destructive/40
                        dark:bg-destructive/60
                    `,
                'outline':
                    `
                        bg-background border shadow-xs
                        hover:bg-accent
                        dark:bg-input/30 dark:border-input
                        dark:hover:bg-input/50
                    `,
                'outline-primary':
                    `
                        border-primary text-primary bg-background border
                        shadow-xs
                        hover:bg-accent hover:text-accent-foreground
                    `,
                'secondary':
                    `
                        bg-secondary text-secondary-foreground
                        hover:bg-secondary/80
                    `,
                'ghost': `
                    hover:bg-accent hover:text-accent-foreground
                    dark:hover:bg-accent/50
                `,
                'link': `
                    text-primary underline-offset-4
                    hover:underline
                `,
                'fab': `
                    bg-primary text-primary-foreground shadow-primary/30
                    rounded-full shadow-lg
                `,
            },
            size: {
                'default': `
                    h-9 px-4 py-2
                    has-[>svg]:px-3
                `,
                'sm': `
                    h-8 gap-1.5 rounded-md px-3
                    has-[>svg]:px-2.5
                `,
                'lg': `
                    h-10 rounded-md px-6
                    has-[>svg]:px-4
                `,
                'icon': 'size-9',
                'icon-sm': 'size-8',
                'icon-lg': 'size-10',
                'fab': 'h-14 w-14 rounded-full text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonAnimation = 'default' | 'subtle' | 'back' | 'float' | 'none';

// Framer Motion animation configs require complex types that are difficult to model precisely.
// Using `any` here is acceptable for this specific use case.
// eslint-disable-next-line ts/no-explicit-any
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
                ease: [0.42, 0, 0.58, 1],
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
            transition: {
                type: 'spring' as const,
                stiffness: 400,
                damping: 25,
            },
        },
        whileTap: {
            scale: 0.98,
            transition: {
                type: 'spring' as const,
                stiffness: 400,
                damping: 25,
            },
        },
    },
    back: {
        whileHover: {
            x: -2,
            transition: { ease: [0, 0, 1, 1], duration: 0.1 },
        },
        whileTap: {
            x: -4,
            transition: { ease: [0, 0, 1, 1], duration: 0.05 },
        },
        transition: { duration: 0.15 },
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
                ease: [0.42, 0, 0.58, 1],
            },
        },
        whileHover: {
            scale: 1.08,
            y: -6,
            transition: {
                type: 'spring' as const,
                stiffness: 300,
                damping: 20,
            },
        },
        whileTap: {
            scale: 0.95,
            transition: { duration: 0.1 },
        },
    },
    none: {},
};

type MotionConflicts
    = | 'onAnimationStart'
        | 'onDrag'
        | 'onDragEnd'
        | 'onDragStart';

type ButtonProps = Omit<React.ComponentProps<'button'>, MotionConflicts>
    & VariantProps<typeof buttonVariants> & {
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
    const resolvedAnimation: ButtonAnimation = disabled
        ? 'none'
        : animationType;
    const animationProps = animationConfigs[resolvedAnimation] as Record<string, unknown>;

    if (asChild) {
        return resolvedAnimation !== 'none'
            ? (
                    <motion.div
                        className="inline-block"
                        tabIndex={-1}
                        {...animationProps}
                    >
                        <Slot
                            data-slot="button"
                            className={mergedClassName}
                            {...props}
                        />
                    </motion.div>
                )
            : (
                    <Slot data-slot="button" className={mergedClassName} {...props} />
                );
    }

    if (resolvedAnimation === 'none') {
        return (
            <button
                type="button"
                data-slot="button"
                className={mergedClassName}
                disabled={disabled}
                {...props}
            />
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
