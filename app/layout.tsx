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
        <body className="antialiased">
            <Header />
            <main className="px-8">
                {children}
            </main>
        </body>
    </html>
);

export default RootLayout;
