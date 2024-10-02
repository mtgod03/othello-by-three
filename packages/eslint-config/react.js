/**
 * @type {import("eslint").Linter.Config}
 * @see {@link https://github.com/vercel/style-guide/tree/canary/eslint | The Vercel Style Guide}
 */
module.exports = {
  extends: [require.resolve('@vercel/style-guide/eslint/react'), 'prettier'],
};
