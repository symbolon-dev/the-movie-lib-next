import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
    title: 'The Movie Lib - Next',
    description: 'Discover and explore movies with The Movie Lib',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html lang="en">
        <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <Header />
            <main className="px-4 md:px-8 container mx-auto">
                {children}
            </main>
        </body>
    </html>
);

export default RootLayout;
