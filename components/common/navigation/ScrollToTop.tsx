'use client';

import { useEffect } from 'react';

type ScrollToTopProps = {
    resetOnMount?: boolean;
};

const ScrollToTop = ({ resetOnMount = true }: ScrollToTopProps) => {
    useEffect(() => {
        if (resetOnMount && typeof window !== 'undefined') {
            // Scroll to top immediately
            window.scrollTo(0, 0);

            // Also ensure it happens after any potential layout changes
            const timeoutId = setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);

            return () => clearTimeout(timeoutId);
        }
    }, [resetOnMount]);

    return null;
};

export { ScrollToTop };