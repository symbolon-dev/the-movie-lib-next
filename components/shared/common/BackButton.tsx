import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
    href: string;
    label?: string;
    className?: string;
}

const BackButton = ({ href, label = 'Back', className = '' }: BackButtonProps) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2 text-gray-300 transition-colors hover:text-white ${className}`}
        >
            <ArrowLeft className="h-5 w-5" />
            <span>{label}</span>
        </Link>
    );
};

export default BackButton;
