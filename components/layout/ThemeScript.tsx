const scriptContent = `(() => {
    try {
        const root = document.documentElement;
        const stored = localStorage.getItem('theme-store');
        const parsed = stored ? JSON.parse(stored) : null;
        const persisted = parsed?.state?.mode;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const mode = persisted === 'light' || persisted === 'dark' ? persisted : (prefersDark ? 'dark' : 'light');

        root.classList.toggle('dark', mode === 'dark');
        root.classList.toggle('light', mode === 'light');
        root.dataset.theme = mode;
    } catch (error) {
        const root = document.documentElement;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const fallbackMode = prefersDark ? 'dark' : 'light';
        root.classList.toggle('dark', fallbackMode === 'dark');
        root.classList.toggle('light', fallbackMode === 'light');
        root.dataset.theme = fallbackMode;
    }
})();`;

const ThemeScript = () => (
    <script dangerouslySetInnerHTML={{ __html: scriptContent }} suppressHydrationWarning />
);

export { ThemeScript };
