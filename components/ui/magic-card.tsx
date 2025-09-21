//TODO: Refactor
'use client';

import React, { useCallback, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagicCardProps {
    children?: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
}

const MagicCard = ({
    children,
    className,
    gradientSize = 200,
    gradientColor,
    gradientOpacity = 0.8,
}: MagicCardProps) => {
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const reset = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [mouseX, mouseY],
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
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            className={cn(
                'group bg-card border-primary/30 text-foreground relative overflow-hidden rounded-xl border-2',
                className,
            )}
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
};

export { MagicCard };
