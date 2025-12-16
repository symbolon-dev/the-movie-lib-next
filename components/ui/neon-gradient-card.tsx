'use client';

import type { ComponentProps, CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type NeonColorPair = {
    firstColor: string;
    secondColor: string;
};

type NeonGradientCardProps = ComponentProps<'div'> & {
    contentclassname?: string;
    borderSize?: number;
    borderRadius?: number;
    neonColors?: NeonColorPair;
};

const DEFAULT_NEON_COLORS: NeonColorPair = {
    firstColor: '#ff00aa',
    secondColor: '#00FFF1',
};

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
    className,
    children,
    borderSize = 2,
    borderRadius = 20,
    neonColors,
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const colors = neonColors ?? DEFAULT_NEON_COLORS;

    const setDimensionsRef = useRef(setDimensions);

    useEffect(() => {
        setDimensionsRef.current = setDimensions;
    }, [setDimensions]);

    useEffect(() => {
        if (containerRef.current == null)
            return;

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const { width, height } = entry.contentRect;
                setDimensionsRef.current({ width, height });
            });
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (containerRef.current == null)
            return;

        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensionsRef.current({ width: offsetWidth, height: offsetHeight });
    }, [children]);

    return (
        <div
            ref={containerRef}
            style={
                {
                    '--border-size': `${borderSize}px`,
                    '--border-radius': `${borderRadius}px`,
                    '--neon-first-color': colors.firstColor,
                    '--neon-second-color': colors.secondColor,
                    '--card-width': `${dimensions.width}px`,
                    '--card-height': `${dimensions.height}px`,
                    '--card-content-radius': `${borderRadius - borderSize}px`,
                    '--pseudo-element-background-image': `linear-gradient(0deg, ${colors.firstColor}, ${colors.secondColor})`,
                    '--pseudo-element-width': `${dimensions.width + borderSize * 2}px`,
                    '--pseudo-element-height': `${dimensions.height + borderSize * 2}px`,
                    '--after-blur': `${dimensions.width / 3}px`,
                } as CSSProperties
            }
            className={cn(
                'relative z-10 size-full rounded-[var(--border-radius)]',
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    `
                        relative size-full min-h-[inherit]
                        rounded-[var(--card-content-radius)] bg-gray-100 p-6
                    `,
                    `
                        before:absolute before:-top-[var(--border-size)]
                        before:-left-[var(--border-size)] before:-z-10
                        before:block
                    `,
                    `
                        before:h-[var(--pseudo-element-height)]
                        before:w-[var(--pseudo-element-width)]
                        before:rounded-[var(--border-radius)]
                        before:content-[\'\']
                    `,
                    `
                        before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))]
                        before:bg-[length:100%_200%]
                    `,
                    'before:animate-background-position-spin',
                    `
                        after:absolute after:-top-[var(--border-size)]
                        after:-left-[var(--border-size)] after:-z-10 after:block
                    `,
                    `
                        after:h-[var(--pseudo-element-height)]
                        after:w-[var(--pseudo-element-width)]
                        after:rounded-[var(--border-radius)]
                        after:blur-[var(--after-blur)] after:content-[\'\']
                    `,
                    `
                        after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))]
                        after:bg-[length:100%_200%] after:opacity-80
                    `,
                    'after:animate-background-position-spin',
                    'dark:bg-neutral-900',
                    'break-words',
                )}
            >
                {children}
            </div>
        </div>
    );
};
