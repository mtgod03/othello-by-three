/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:storybook/recommended', 'prettier'],
  overrides: [
    {
      files: ['*.stories.@(js|mjs|jsx|ts|tsx)'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
