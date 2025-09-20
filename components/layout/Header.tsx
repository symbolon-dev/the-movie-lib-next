import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export const Header = () => {
    return (
        <header className="bg-card border-border w-full border-b py-4 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/">
                    <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                        The Movie Lib
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
};
