'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.startsWith('/movies')) return;

        window.history.scrollRestoration = 'manual';

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, [pathname]);

    return null;
};
