// eslint-disable-next-line no-undef
module.exports = {
    env: {
        es2021: true,
        browser: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:react/jsx-runtime',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'react/prop-types': 'off',
        'no-console': 'error',
    },
};
