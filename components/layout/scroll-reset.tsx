'use client';

import { useEffect } from 'react';

type ScrollResetProps = {
    resetOnMount?: boolean;
};

export const ScrollReset = ({ resetOnMount = true }: ScrollResetProps) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !resetOnMount) return;

        window.scrollTo(0, 0);

        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [resetOnMount]);

    return undefined;
};
