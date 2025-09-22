'use client';

import {
    type ComponentPropsWithoutRef,
    type CSSProperties,
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { cn } from '@/lib/utils';

type NeonColorPair = {
    firstColor: string;
    secondColor: string;
};

type NeonGradientCardProps = ComponentPropsWithoutRef<'div'> & {
    contentClassName?: string;
    borderSize?: number;
    borderRadius?: number;
    neonColors?: NeonColorPair;
};

const DEFAULT_COLORS: NeonColorPair = {
    firstColor: '#ff00aa',
    secondColor: '#00FFF1',
};

const NeonGradientCard = forwardRef<HTMLDivElement, NeonGradientCardProps>(
    (props, forwardedRef) => {
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
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                localRef.current = node;
                if (typeof forwardedRef === 'function') {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    forwardedRef.current = node;
                }
            },
            [forwardedRef],
        );
        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

        const updateDimensions = useCallback(() => {
            const node = localRef.current;
            if (!node) return;
            setDimensions({ width: node.offsetWidth, height: node.offsetHeight });
        }, []);

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
        }, [updateDimensions]);

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
                ref={setRefs}
                className={cn('relative z-10 size-full rounded-[var(--border-radius)]', className)}
                style={{ ...(cssVariables as CSSProperties), ...style }}
                {...rest}
            >
                <div
                    className={cn(
                        'relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-gray-100 p-6 break-words',
                        'before:absolute before:-top-[var(--border-size)] before:-left-[var(--border-size)] before:-z-10 before:block',
                        "before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%] before:content-['']",
                        'before:animate-background-position-spin',
                        'after:absolute after:-top-[var(--border-size)] after:-left-[var(--border-size)] after:-z-10 after:block',
                        "after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80 after:blur-[var(--after-blur)] after:content-['']",
                        'after:animate-background-position-spin',
                        'dark:bg-neutral-900',
                        contentClassName,
                    )}
                >
                    {children}
                </div>
            </div>
        );
    },
);

NeonGradientCard.displayName = 'NeonGradientCard';

export { NeonGradientCard };
