const handleStoreError = (error: unknown, action: string, set: Function) => {
    console.error(`Failed to ${action}:`, error);
    set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
    });
};

export { handleStoreError };
