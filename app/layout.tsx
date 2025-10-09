import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';

import { Header } from '@/components/layout/header';

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    title: 'The Movie Lib - Next',
    description: 'Discover and explore movies with The Movie Lib',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={`${geist.variable} ${geistMono.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
        >
            <NextTopLoader color="#2563eb" height={3} showSpinner={false} />
            <ThemeProvider attribute="class">
                <Header />
                <main className="container mx-auto px-4 md:px-8">{children}</main>
            </ThemeProvider>
        </body>
    </html>
);

export default RootLayout;
