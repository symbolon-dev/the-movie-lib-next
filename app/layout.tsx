import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'The Movie Lib - Next',
    description: 'Discover and explore movies with The Movie Lib',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
    <html lang="en">
        <body
            className={`${inter.variable} ${playfair.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
        >
            <Header />
            <main className="container mx-auto px-4 md:px-8">{children}</main>
        </body>
    </html>
);

export default RootLayout;
