/** @type {import("prettier").Config} */
export default {
    tailwindFunctions: ['clsx', 'tw', 'tv', 'cn', 'twMerge', 'tm', 'cx'],
    plugins: ['prettier-plugin-astro', "prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],

    printWidth: 120,
    singleQuote: true,
    trailingComma: 'none',
    tabWidth: 2,
    semi: false,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: false
};
