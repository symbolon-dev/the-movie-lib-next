import { NextResponse } from 'next/server';

const handleApiError = (error: unknown, endpoint: string, resource: string) => {
    console.error(`Error in ${endpoint} route:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('404')) {
        return NextResponse.json(
            {
                error: `${resource.charAt(0).toUpperCase() + resource.slice(1, -1)} not found`,
                details: `The requested ${resource.slice(0, -1)} could not be found on TMDB`,
            },
            { status: 404 },
        );
    }

    return NextResponse.json(
        {
            error: `Failed to fetch ${resource}`,
            details: errorMessage,
        },
        { status: 500 },
    );
};

export { handleApiError };
