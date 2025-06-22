/**
 * @type {import('prettier').Config}
 */
export default {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
    plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
    importOrder: [
        '^react$',
        '^next(/.*)?$',
        '<THIRD_PARTY_MODULES>',
        '^@/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
