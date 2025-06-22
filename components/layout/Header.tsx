import Link from 'next/link';

import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
    return (
        <header className="w-full bg-white py-4 shadow-sm dark:bg-gray-800">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                        The Movie Lib
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
