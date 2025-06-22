import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";

const Header = () => {
    return (
        <header className="w-full py-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between px-4 md:px-8 container mx-auto">
                <Link href="/">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                        The Movie Lib
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}

export default Header;
