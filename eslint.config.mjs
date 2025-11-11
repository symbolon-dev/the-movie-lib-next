import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';

const eslintConfig = [
    ...next,
    {
        plugins: { 
            'simple-import-sort': simpleImportSort,
            'unicorn': unicorn
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
        plugins: {
            'import': importPlugin 
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-invalid-void-type': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'ignoreRestSiblings': true
            }],
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { 'prefer': 'type-imports' }],
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/prop-types': 'off',
            'react/no-danger': 'off',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/self-closing-comp': 'error',
            'react/jsx-boolean-value': ['error', 'never'],

            'prefer-const': 'error',
            'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
            'no-param-reassign': 'error',
            'no-else-return': 'error',
            'no-shadow': 'off',
            'no-unsafe-optional-chaining': 'error',
            'no-return-await': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForStatement',
                    message: 'For loops are not allowed. Use iterable methods or for..of loops instead.',
                },
            ],
            'no-unused-vars': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-var': 'error',
            'object-shorthand': ['error', 'always'],
            'prefer-template': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'no-nested-ternary': 'error',
            'no-unneeded-ternary': 'error',
            'yoda': 'error',
            'curly': ['error', 'all'],

            'import/no-cycle': ['error', { maxDepth: Infinity }],
            'import/no-duplicates': 'error',
            'import/no-default-export': 'off',
        },
    },
    {
        files: ['**/*.jsx', '**/*.tsx'],
        rules: {
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-has-content': 'error',
            'jsx-a11y/label-has-associated-control': 'error',
            'jsx-a11y/no-redundant-roles': 'error',
            'jsx-a11y/no-static-element-interactions': 'error',
            'jsx-a11y/click-events-have-key-events': 'error',
            'jsx-a11y/tabindex-no-positive': 'error',
            'jsx-a11y/heading-has-content': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/aria-unsupported-elements': 'error',
        },
    },
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
        rules: {
            'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
        },
    },
    prettier,
];

export default eslintConfig;
