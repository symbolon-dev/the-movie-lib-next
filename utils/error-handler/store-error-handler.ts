const handleStoreError = (
    error: unknown,
    action: string,
    set: (state: { error: string; isLoading: boolean }) => void,
) => {
    console.error(`Failed to ${action}:`, error);
    set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
    });
};

export { handleStoreError };
