# typescript-config

TypeScriptの共有設定

## 使用方法

以下の手順で`tsconfig.json`の`extends`にファイルを追加してください。

1. `base.js`を`extends`に加える
2. 使用するツールに応じてその他のファイルを`extends`に加える

例えば、Nextを使う場合は以下のようになります。

```json
// tsconfig.json

{
  "extends": ["@repo/typescript-config/base.json", "@repo/typescript-config/nextjs.json"],
  "include": ["files to be included"],
  "exclude": ["files to be excluded"]
}
```

## その他

- `tsconfig.json`の`extends`に配列を使うにはTypeScriptのバージョン5.0以上が必要です。
