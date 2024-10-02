/**
 * @type {import("eslint").Linter.Config}
 * @see {@link https://github.com/vercel/style-guide/tree/canary/eslint | The Vercel Style Guide}
 */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/next'), 'prettier'],
  settings: {
    'jsx-a11y': {
      components: {
        Image: 'img',
        Link: 'a',
        Script: 'script',
      },
    },
  },
  overrides: [
    {
      files: ['app/**/*.[jt]s?(x)'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
