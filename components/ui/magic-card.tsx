'use client';

import type { ComponentProps, PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

type MagicCardProps = ComponentProps<'div'> & {
    gradientSize?: number;
    gradientColor?: string;
};

export const MagicCard = (props: MagicCardProps) => {
    const {
        children,
        className,
        gradientSize = 200,
        gradientColor = 'var(--color-primary)',
        onPointerMove,
        onPointerLeave,
        ...rest
    } = props;
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
        onPointerMove?.(event);
    };

    useEffect(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [mouseX, mouseY, gradientSize]);

    useEffect(() => {
        const reset = () => {
            mouseX.set(-gradientSize);
            mouseY.set(-gradientSize);
        };

        const handleGlobalPointerOut = (e: PointerEvent) => {
            if (!e.relatedTarget) {
                reset();
            }
        };

        const handleVisibility = () => {
            if (document.visibilityState !== 'visible') {
                reset();
            }
        };

        window.addEventListener('pointerout', handleGlobalPointerOut);
        window.addEventListener('blur', reset);
        window.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('pointerout', handleGlobalPointerOut);
            window.removeEventListener('blur', reset);
            window.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [mouseX, mouseY, gradientSize]);

    const maskImage = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = {
        maskImage,
        WebkitMaskImage: maskImage,
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => {
                mouseX.set(-gradientSize);
                mouseY.set(-gradientSize);
                onPointerLeave?.(event);
            }}
            className={cn(
                'group border-primary/30 bg-card text-foreground relative overflow-hidden rounded-xl border-2',
                className,
            )}
            {...rest}
        >
            <div className="relative z-10">{children}</div>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-(--magic-card-opacity)"
                style={{
                    background: gradientColor,
                    ...style,
                }}
            />
        </div>
    );
};

MagicCard.displayName = 'MagicCard';
