/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/base.js', '@repo/eslint-config/vitest.js'],
  rules: {
    // ビット演算を用いてオセロを実装するため
    'no-bitwise': 'off',
  },
};
