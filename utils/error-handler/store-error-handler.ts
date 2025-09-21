const getUserFriendlyMessage = (error: unknown, action: string): string => {
    if (error instanceof Error) {
        // Network errors
        if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
            return 'Connection problem. Please check your internet connection and try again.';
        }

        // API errors
        if (error.message.includes('404')) {
            return action.includes('movie')
                ? 'Movie not found. It may have been removed from the database.'
                : 'The requested content was not found.';
        }

        if (error.message.includes('500')) {
            return 'Our servers are experiencing issues. Please try again in a few moments.';
        }

        if (error.message.includes('timeout')) {
            return 'Request timed out. Please check your connection and try again.';
        }

        // Return original message if it's already user-friendly
        if (error.message.length < 100 && !error.message.includes('Error:')) {
            return error.message;
        }
    }

    // Fallback based on action
    switch (action) {
        case 'fetch movies':
            return 'Unable to load movies. Please try again.';
        case 'search movies':
            return 'Search failed. Please try a different search term.';
        case 'fetch genres':
            return 'Unable to load movie categories. Please refresh the page.';
        default:
            return 'Something went wrong. Please try again.';
    }
};

const handleStoreError = (
    error: unknown,
    action: string,
    set: (state: { error: string; isLoading: boolean }) => void,
) => {
    console.error(`Failed to ${action}:`, error);

    const userFriendlyMessage = getUserFriendlyMessage(error, action);

    set({
        error: userFriendlyMessage,
        isLoading: false,
    });
};

export { handleStoreError };
