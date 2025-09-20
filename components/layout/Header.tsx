import Link from 'next/link';
import { AnimatedThemeToggle } from '@/components/layout/AnimatedThemeToggle';

export const Header = () => {
    return (
        <header className="bg-card border-border w-full border-b py-4 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/">
                    <h1 className="text-foreground font-serif text-3xl font-bold">The Movie Lib</h1>
                </Link>
                <AnimatedThemeToggle />
            </div>
        </header>
    );
};
