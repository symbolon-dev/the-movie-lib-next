import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/shared/layout/Header';

import './globals.css';

export const metadata: Metadata = {
    title: 'The Movie Lib - Next',
    description: 'Discover and explore movies with The Movie Lib',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
    <html lang="en">
        <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
            <Header />
            <main className="container mx-auto px-4 md:px-8">{children}</main>
        </body>
    </html>
);

export default RootLayout;
