/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never', []], // 日本語を用いるため無効化
    'references-empty': [2, 'never'],
  },
};
