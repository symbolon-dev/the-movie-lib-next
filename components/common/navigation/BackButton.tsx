import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BackButtonProps = {
    href: string;
    label?: string;
    className?: string;
};

export const BackButton = ({ href, label = 'Back', className = '' }: BackButtonProps) => {
    return (
        <Button asChild variant="outline" className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 ${className}`}>
            <Link href={href}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {label}
            </Link>
        </Button>
    );
};
