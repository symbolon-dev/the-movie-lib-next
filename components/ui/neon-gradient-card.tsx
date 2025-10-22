'use client';

import type { ComponentProps, CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type NeonColorPair = {
    firstColor: string;
    secondColor: string;
};

type NeonGradientCardProps = ComponentProps<'div'> & {
    contentClassName?: string;
    borderSize?: number;
    borderRadius?: number;
    neonColors?: NeonColorPair;
};

const DEFAULT_COLORS: NeonColorPair = {
    firstColor: '#ff00aa',
    secondColor: '#00FFF1',
};

export const NeonGradientCard = (props: NeonGradientCardProps) => {
    const {
        className,
        contentClassName,
        children,
        borderSize = 2,
        borderRadius = 20,
        neonColors = DEFAULT_COLORS,
        style,
        ...rest
    } = props;
    const localRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const updateDimensions = () => {
        const node = localRef.current;
        if (!node) return;
        setDimensions({ width: node.offsetWidth, height: node.offsetHeight });
    };

    useEffect(() => {
        updateDimensions();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateDimensions);
            return () => {
                window.removeEventListener('resize', updateDimensions);
            };
        }

        const node = localRef.current;
        if (!node) return;

        const observer = new ResizeObserver(() => updateDimensions());
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const { firstColor, secondColor } = neonColors;
    const innerRadius = Math.max(borderRadius - borderSize, 0);
    const cssVariables: Record<string, string> = {
        '--border-size': `${borderSize}px`,
        '--border-radius': `${borderRadius}px`,
        '--neon-first-color': firstColor,
        '--neon-second-color': secondColor,
        '--card-width': `${dimensions.width}px`,
        '--card-height': `${dimensions.height}px`,
        '--card-content-radius': `${innerRadius}px`,
        '--pseudo-element-width': `${dimensions.width + borderSize * 2}px`,
        '--pseudo-element-height': `${dimensions.height + borderSize * 2}px`,
        '--after-blur': `${dimensions.width / 3}px`,
    };

    return (
        <div
            ref={localRef}
            className={cn('relative z-10 size-full rounded-(--border-radius)', className)}
            style={{ ...(cssVariables as CSSProperties), ...style }}
            {...rest}
        >
            <div
                className={cn(
                    'wrap-break-words relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6',
                    'before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block',
                    "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%] before:content-['']",
                    'before:animate-background-position-spin',
                    'after:-top-(--border-size)after:w-(--pseudo-element-width) after:absolute after:-z-10 after:block',
                    "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80 after:blur-(--after-blur) after:content-['']",
                    'after:animate-background-position-spin',
                    contentClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
};

NeonGradientCard.displayName = 'NeonGradientCard';
