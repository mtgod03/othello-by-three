const jsFiles = '*.{?([cm])js,jsx}';
const tsFiles = '*.{?([cm])ts,tsx}';
const otherFiles = `!({${jsFiles},${tsFiles}})`;

const tscCommand = () => 'tsc --noEmit';
const eslintCommand = 'eslint --fix';
const prettierCommand = 'prettier --write --ignore-unknown';

/** @type {import('lint-staged').Config} */
module.exports = {
  [jsFiles]: [eslintCommand, prettierCommand],
  [tsFiles]: [tscCommand, eslintCommand, prettierCommand],
  [otherFiles]: prettierCommand,
};
