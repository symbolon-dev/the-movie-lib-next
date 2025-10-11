'use client';

import Link from 'next/link';

import { ThemeToggle } from '@/components/layout/theme-toggle';

export const Header = () => {
    return (
        <header className="bg-card border-border w-full border-b py-4 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/">
                    <span className="heading-4 text-foreground">The Movie Lib</span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
};
