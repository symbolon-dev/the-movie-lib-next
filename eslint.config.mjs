import antfu from '@antfu/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tailwind from 'eslint-plugin-better-tailwindcss';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default antfu(
    {
        react: true,
        nextjs: true,
        typescript: {
            tsconfigPath: './tsconfig.json',
        },
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
        formatters: true,
    },
    ...pluginQuery.configs['flat/recommended'],
    {
        name: 'project-strict',
        rules: {
            // Prefer safe array callbacks
            'array-callback-return': ['error', { allowImplicit: false }],

            // Prefer arrow functions over function declarations
            'antfu/top-level-function': 'off',
            'prefer-arrow-callback': 'error',
            'func-style': ['error', 'expression'],

            // Prefer type over interface for consistency
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

            // Warn when using `any`; allowed only for external data or edge cases
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        name: 'jsx-a11y-recommended',
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
        },
    },
    {
        name: 'tailwind-config',
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'better-tailwindcss': tailwind,
        },
        settings: {
            'better-tailwindcss': {
                entryPoint: 'app/assets/css/tailwind.css',
            },
        },
        rules: {
            ...tailwind.configs.stylistic.rules,
            'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', {
                indent: 4,
            }],
        },
    },
);
