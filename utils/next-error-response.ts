import { NextResponse } from 'next/server';

type HTTPError = Error & {
    statusCode?: number;
    status?: number;
};

const extractStatusCode = (error: unknown): number => {
    if (error instanceof Error) {
        const httpError = error as HTTPError;

        if (httpError.statusCode != null && httpError.statusCode !== 0) {
            return httpError.statusCode;
        }

        if (httpError.status != null && httpError.status !== 0) {
            return httpError.status;
        }

        // Parse status code from error message as fallback
        const statusMatch = httpError.message.match(/\b(4\d{2}|5\d{2})\b/)?.[1];
        if (statusMatch != null && statusMatch !== '') {
            return Number.parseInt(statusMatch, 10);
        }
    }

    return 500;
};

export const createErrorResponse = (error: unknown, endpoint: string) => {
    console.error(`Error in ${endpoint}:`, error);

    const errorMessage
        = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = extractStatusCode(error);

    return NextResponse.json(
        {
            error: 'Request failed',
            details: errorMessage,
        },
        { status: statusCode },
    );
};
