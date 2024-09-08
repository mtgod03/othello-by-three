/**
 * @type {import("eslint").Linter.Config}
 * @see {@link https://github.com/vercel/style-guide/tree/canary/eslint | The Vercel Style Guide}
 */
module.exports = {
  extends: [
    "./_base",
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    "jsx-a11y": {
      components: {
        Image: "img",
        Link: "a",
        Script: "script",
      },
    },
  },
  overrides: [
    {
      files: ["app/**/*.[jt]s?(x)"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
