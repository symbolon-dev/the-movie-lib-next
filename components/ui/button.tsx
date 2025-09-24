'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type MotionProps } from 'framer-motion';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow',
                destructive: 'bg-destructive text-destructive-foreground shadow-sm',
                outline: 'border border-input bg-background shadow-sm',
                'outline-primary': 'border border-primary text-primary bg-background shadow-sm',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm',
                ghost: 'bg-transparent',
                link: 'text-primary underline-offset-4 hover:underline',
                fab: 'rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
                fab: 'h-14 w-14 rounded-full text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type MotionConflicts =
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDragCapture'
    | 'onDragExit'
    | 'onDrop'
    | 'onAnimationStart'
    | 'onAnimationIteration'
    | 'onAnimationEnd';

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicts>;

type ButtonProps = NativeButtonProps &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        animationType?: ButtonAnimation;
    };

type ButtonAnimation = 'default' | 'subtle' | 'back' | 'theme' | 'float' | 'none';

const animationConfigs: Record<ButtonAnimation, MotionProps> = {
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
    theme: {
        whileHover: {
            scale: 1.1,
            rotate: [0, -10, 10, 0],
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            transition: {
                duration: 0.4,
                ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
            },
        },
        whileTap: {
            scale: 0.95,
            rotate: 180,
            transition: { duration: 0.2 },
        },
        initial: {
            scale: 1,
            rotate: 0,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, asChild = false, animationType = 'default', disabled, ...rest },
        ref,
    ) => {
        const resolvedAnimation: ButtonAnimation = disabled ? 'none' : animationType;
        const animationProps = animationConfigs[resolvedAnimation];
        const mergedClassName = cn(buttonVariants({ variant, size, className }));

        if (asChild && resolvedAnimation !== 'none') {
            return (
                <motion.div className="inline-block" tabIndex={-1} {...animationProps}>
                    <Slot className={mergedClassName} ref={ref} {...rest} />
                </motion.div>
            );
        }

        if (asChild) {
            return <Slot className={mergedClassName} ref={ref} {...rest} />;
        }

        if (resolvedAnimation === 'none') {
            return <button className={mergedClassName} ref={ref} disabled={disabled} {...rest} />;
        }

        return (
            <motion.button
                className={mergedClassName}
                ref={ref}
                disabled={disabled}
                {...animationProps}
                {...(rest as NativeButtonProps)}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonAnimation, ButtonProps };
