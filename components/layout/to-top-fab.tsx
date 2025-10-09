'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const SHOW_AFTER_SCROLL = 320; // pixels

export const ToTopFab = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (typeof window === 'undefined') return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            type="button"
            size="fab"
            variant="fab"
            animationType="float"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed right-6 bottom-6 z-50 transition-all duration-200 ease-out ${
                isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-y-6 scale-60 opacity-0'
            }`}
        >
            <ArrowUp className="size-5" />
        </Button>
    );
};
