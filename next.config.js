/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
    swcMinify: false,
    reactStrictMode: true,
    experimental: { esmExternals: true },
    i18n: {
        locales: ["bn-BdSL", "en-ASL"],
        defaultLocale: "en-ASL",
        localeDetection: false,
    },
});

module.exports = nextConfig;

// const nextConfig = {
//     swcMinify: false,
//     reactStrictMode: true,
//     i18n: {
//         locales: ["bn-BdSL", "en-ASL"],
//         defaultLocale: "en-ASL",
//         localeDetection: false,
//     },
// };

// module.exports = nextConfig;
