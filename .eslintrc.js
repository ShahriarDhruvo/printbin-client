module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "next/core-web-vitals",
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
    },
    plugins: ["react"],
    rules: {},
    settings: {
        react: {
            version: "detect",
        },
    },
};
