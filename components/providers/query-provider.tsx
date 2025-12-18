'use client';

import type { ReactNode } from 'react';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: isServer ? 'static' : 60000, // static on server, 1 minute on client
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        retry: 1,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
