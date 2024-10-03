const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/**
 * @type {import("eslint").Linter.Config}
 * @see {@link https://github.com/vercel/style-guide/tree/canary/eslint | The Vercel Style Guide}
 */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/_base'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'turbo',
    'prettier',
  ],
  parserOptions: {
    project,
  },
  plugins: ['unused-imports'],
  rules: {
    // onにするルール
    'func-style': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/no-empty-named-blocks': 'warn',
    'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
    'unused-imports/no-unused-imports': 'error',

    // offにするルール
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    '*.config.[jt]s',
    '*.config.c[jt]s',
    '*.config.m[jt]s',
    'node_modules/',
    'dist/',
  ],
  reportUnusedDisableDirectives: true,
};
