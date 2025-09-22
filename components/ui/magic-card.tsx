'use client';

import {
    forwardRef,
    useCallback,
    useEffect,
    type ComponentPropsWithoutRef,
    type PointerEvent as ReactPointerEvent,
} from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

type MagicCardProps = ComponentPropsWithoutRef<'div'> & {
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
};

const MagicCard = forwardRef<HTMLDivElement, MagicCardProps>((props, ref) => {
    const {
        children,
        className,
        gradientSize = 200,
        gradientColor = 'var(--color-primary)',
        gradientOpacity = 0.8,
        onPointerMove,
        onPointerLeave,
        ...rest
    } = props;
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const reset = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    const handlePointerMove = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            mouseX.set(event.clientX - rect.left);
            mouseY.set(event.clientY - rect.top);
            onPointerMove?.(event);
        },
        [mouseX, mouseY, onPointerMove],
    );

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
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
    }, [reset]);

    const maskImage = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = {
        maskImage,
        WebkitMaskImage: maskImage,
    };

    return (
        <div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => {
                reset();
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
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: gradientColor,
                    opacity: gradientOpacity,
                    ...style,
                }}
            />
        </div>
    );
});

MagicCard.displayName = 'MagicCard';

export { MagicCard };
