'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SHOW_AFTER_SCROLL = 320;

export const BackToTopFab = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="back-to-top-fab"
                    initial={{ opacity: 0, scale: 0.6, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 16 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <Button
                        type="button"
                        size="fab"
                        variant="fab"
                        animationType="float"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        <ArrowUp className="size-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
