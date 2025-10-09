import { NextResponse } from 'next/server';

export const createErrorResponse = (error: unknown, endpoint: string) => {
    console.error(`Error in ${endpoint}:`, error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = errorMessage.includes('404') ? 404 : 500;

    return NextResponse.json(
        {
            error: 'Request failed',
            details: errorMessage,
        },
        { status: statusCode },
    );
};
