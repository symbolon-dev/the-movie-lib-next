import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BackButtonProps = {
    href: string;
    label?: string;
    className?: string;
};

const BackButton = ({ href, label = 'Back', className = '' }: BackButtonProps) => {
    return (
        <Button asChild variant="outline-primary" animationType="back" className={className}>
            <Link href={href}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {label}
            </Link>
        </Button>
    );
};

export { BackButton };
