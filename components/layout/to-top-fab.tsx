'use client';

import { ArrowUp } from 'lucide-react';
import { useWindowScroll } from 'react-use';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SHOW_AFTER_SCROLL = 320; // pixels

export const ToTopFab = () => {
    const { y } = useWindowScroll();
    const isVisible = y > SHOW_AFTER_SCROLL;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            type="button"
            size="fab"
            variant="fab"
            animationType="float"
            onClick={scrollToTop}
            className={cn(
                'fixed right-6 bottom-6 z-50 transition-all duration-200 ease-out',
                isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none translate-y-6 scale-60 opacity-0',
            )}
        >
            <ArrowUp className="size-5" />
        </Button>
    );
};
