import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full py-4 px-8 bg-white shadow-sm">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                        The Movie Lib
                    </span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
