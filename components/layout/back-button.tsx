'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
    href: string;
    label?: string;
    className?: string;
};

export const BackButton = ({ href = '/', label = 'Back', className = '' }: BackButtonProps) => (
    <Button variant="outline-primary" animationType="back" className={className} asChild>
        <Link href={href}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {label}
        </Link>
    </Button>
);
