const { relative } = require('node:path');

const jsFiles = '*.{?([cm])js,jsx}';
const tsFiles = '*.{?([cm])ts,tsx}';
const otherFiles = `!({${jsFiles},${tsFiles}})`;

const tscCommand = () => 'tsc --noEmit';
const nextLintCommand = (files) =>
  `next lint --fix ${files.map((f) => `--file ${relative(process.cwd(), f)}`).join(' ')}`;
const prettierCommand = 'prettier --write --ignore-path ../../.prettierignore --ignore-unknown';

/** @type {import('lint-staged').Config} */
module.exports = {
  [jsFiles]: [nextLintCommand, prettierCommand],
  [tsFiles]: [tscCommand, nextLintCommand, prettierCommand],
  [otherFiles]: prettierCommand,
};
