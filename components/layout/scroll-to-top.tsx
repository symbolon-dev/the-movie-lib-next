'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.history.scrollRestoration = 'manual';

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, [pathname]);

    return null;
};
