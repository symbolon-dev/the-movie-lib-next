import antfu from '@antfu/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
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
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },
    ...pluginQuery.configs['flat/recommended'],
    {
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
        },
    },
    {
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        },
    },
);
