'use client';

import { useEffect } from 'react';

type ScrollToTopProps = {
    resetOnMount?: boolean;
};

const ScrollToTop = ({ resetOnMount = true }: ScrollToTopProps) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !resetOnMount) return;

        window.scrollTo(0, 0);

        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [resetOnMount]);

    return null;
};

export { ScrollToTop };
