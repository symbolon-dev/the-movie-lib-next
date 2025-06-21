import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
        plugins: {
            tailwindcss,
        },
        rules: {
            // Tailwind CSS rules
            ...tailwindcss.configs.recommended.rules,
            'tailwindcss/classnames-order': 'error',
            'tailwindcss/no-custom-classname': 'off',
            
            // TypeScript rules
            '@typescript-eslint/array-type': ['error', {
                'default': 'array',
            }],
            '@typescript-eslint/no-invalid-void-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            
            // React rules (adapted from Vue rules)
            'react/prop-types': 'off', // Equivalent to vue/require-prop-types
            'react/no-danger': 'off', // Equivalent to vue/no-v-html
            'react/jsx-max-props-per-line': ['error', {
                'maximum': 3,
                'when': 'multiline',
            }], // Equivalent to vue/max-attributes-per-line
            'react/jsx-indent': ['error', 4], // Equivalent to vue/html-indent
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // Similar to vue/html-closing-bracket-newline
            'react/jsx-curly-spacing': ['error', 'always'], // Similar to vue/object-curly-spacing
            'react/jsx-tag-spacing': ['error', {
                'closingSlash': 'never',
                'beforeSelfClosing': 'always',
                'afterOpening': 'never',
                'beforeClosing': 'never',
            }], // Similar to vue/html-closing-bracket-spacing
            
            // General JavaScript/TypeScript rules
            'semi': ['error', 'always'],
            'indent': ['error', 4, {
                'SwitchCase': 1,
            }],
            'quotes': ['error', 'single', {
                'avoidEscape': true,
            }],
            'brace-style': ['error', '1tbs', {
                'allowSingleLine': true,
            }],
            'block-spacing': ['error', 'always'],
            'prefer-spread': 'error',
            'prefer-destructuring': ['error', {
                'object': true,
                'array': true,
            }],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForStatement',
                    message: 'For loops are not allowed. Use iterable methods or for..of loops instead.',
                },
            ],
            'prefer-const': 'error',
            'prefer-template': 'error',
            'eqeqeq': ['error', 'always'],
            'object-shorthand': 'error',
            'default-param-last': 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'no-param-reassign': 'error',
            'prefer-arrow-callback': 'error',
            'no-else-return': 'error',
            'no-shadow': 'error',
            'eol-last': ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'no-unused-vars': ['error'],
        },
    },
];

export default eslintConfig;
