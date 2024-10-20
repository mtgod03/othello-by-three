/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    '@repo/eslint-config/base.js',
    '@repo/eslint-config/browser.js',
    '@repo/eslint-config/node.js',
    '@repo/eslint-config/react.js',
    '@repo/eslint-config/next.js',
    '@repo/eslint-config/tailwind.js',
    '@repo/eslint-config/storybook.js',
  ],
  settings: {
    tailwindcss: {
      callees: ['cn'],
    },
  },
};
