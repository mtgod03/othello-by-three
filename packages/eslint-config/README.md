# eslint-config

ESLintの共有設定

## 使用方法

以下の手順でESLintの設定ファイルの`extends`にファイルを追加してください。

1. `base.js`を`extends`に加える
2. ブラウザやNodeのAPIを使用する場合は`browser.js`・`node.js`を`extends`に加える
3. 使用するツールに応じてその他のファイルを`extends`に加える

例えば、Nextを使う場合は以下のようになります。

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    '@repo/eslint-config/base.js',
    '@repo/eslint-config/browser.js',
    '@repo/eslint-config/node.js',
    '@repo/eslint-config/react.js',
    '@repo/eslint-config/next.js',
  ],
};
```

## その他

- 現在、Flat Configには対応していません。
- `eslint-config-prettier`はすでに組み込まれています。
