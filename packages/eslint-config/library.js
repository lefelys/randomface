const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    'eslint-config-turbo',
    ...[
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
    ],
  ].map(require.resolve),
  parserOptions: {
    project: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.test.ts',
    '.eslintrc.js',
    '.eslintrc.cjs',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'tsdoc/syntax': 'off',
  },
};
