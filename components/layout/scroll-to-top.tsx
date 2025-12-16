'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useEffectEvent } from 'react';

export const ScrollToTop = () => {
    const pathname = usePathname();

    const scrollToTop = useEffectEvent(() => {
        if (!pathname.startsWith('/movies'))
            return;
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    });

    useEffect(() => scrollToTop(), [pathname]);

    return null;
};
