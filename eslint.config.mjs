import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    ...compat.extends("prettier"),
    ...compat.config({
        plugins: ["simple-import-sort"],
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    }),
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-invalid-void-type': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'ignoreRestSiblings': true
            }],
            '@typescript-eslint/no-shadow': 'error',
            'react/prop-types': 'off',
            'react/no-danger': 'off',
            'prefer-const': 'error',
            'eqeqeq': ['error', 'always'],
            'no-param-reassign': 'error',
            'no-else-return': 'error',
            'no-shadow': 'off',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForStatement',
                    message: 'For loops are not allowed. Use iterable methods or for..of loops instead.',
                },
            ],
            'no-unused-vars': 'off',
        },
    },
];

export default eslintConfig;
