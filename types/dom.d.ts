// TypeScript declarations for experimental View Transition API
// Used by AnimatedThemeToggle for smooth theme transitions

declare global {
    interface Document {
        startViewTransition?: (callback: () => void) => {
            ready: Promise<void>;
        };
    }
}

export {};
