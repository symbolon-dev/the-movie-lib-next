'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

type LoadingSpinnerProps = {
    size?: number;
    className?: string;
};

const LoadingSpinner = ({ size = 32, className }: LoadingSpinnerProps) => {
    return (
        <motion.span
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className={cn(
                'border-muted border-t-primary inline-block rounded-full border-2',
                className,
            )}
            style={{ width: size, height: size }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 0.8 }}
        >
            <span className="sr-only">Loading</span>
        </motion.span>
    );
};

export { LoadingSpinner };
