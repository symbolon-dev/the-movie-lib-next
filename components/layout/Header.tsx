'use client';

import Link from 'next/link';

import { AnimatedThemeToggle } from '@/components/layout/AnimatedThemeToggle';

export const Header = () => {
    const handleLogoClick = () => {
        sessionStorage.removeItem('movie-list-scroll-position');
        sessionStorage.removeItem('navigated-from-movie-list');
    };

    return (
        <header className="bg-card border-border w-full border-b py-4 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/" onClick={handleLogoClick}>
                    <span className="heading-4 text-foreground">The Movie Lib</span>
                </Link>
                <AnimatedThemeToggle />
            </div>
        </header>
    );
};
