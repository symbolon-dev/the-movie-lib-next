import type { Metadata } from 'next';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';

import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { QueryProvider } from '@/components/providers/query-provider';
import './globals.css';

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'The Movie Lib - Next',
    description: 'Discover and explore movies with The Movie Lib',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={`
                ${geist.variable}
                bg-background text-foreground min-h-screen font-sans antialiased
            `}
        >
            <NextTopLoader color="#2563eb" height={3} showSpinner={false} />
            <NuqsAdapter>
                <Suspense fallback={null}>
                    <QueryProvider>
                        <ThemeProvider attribute="class">
                            <Suspense fallback={null}>
                                <ScrollToTop />
                            </Suspense>
                            <Header />
                            <main className={`
                                container mx-auto px-4
                                md:px-8
                            `}
                            >
                                {children}
                            </main>
                        </ThemeProvider>
                    </QueryProvider>
                </Suspense>
            </NuqsAdapter>
        </body>
    </html>
);

export default RootLayout;
