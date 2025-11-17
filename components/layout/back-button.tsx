'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
    label?: string;
    className?: string;
};

export const BackButton = ({ label = 'Back', className = '' }: BackButtonProps) => {
    const router = useRouter();

    return (
        <Button
            role="link"
            variant="outline-primary"
            animationType="back"
            className={className}
            onClick={() => router.back()}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {label}
        </Button>
    );
};
