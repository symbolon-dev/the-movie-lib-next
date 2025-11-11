/**
 * @type {import('prettier').Config}
 */
const config = {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
