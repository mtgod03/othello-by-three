# game

3人オセロのロジック部分

## 実装方法

以下のような左下と右上が削れた9×9のグリッドで六角形の盤面を表現しています。

```
   0 1 2 3 4 5 6 7 8  x
0  o o o o o - - - -
1  o o o o o o - - -
2  o o o o o o o - -
3  o o o o o o o o -
4  o o o o - o o o o
5  - o o o o o o o o
6  - - o o o o o o o
7  - - - o o o o o o
8  - - - - o o o o o

y
```

各プレイヤーは横・縦・左斜めの3方向に石を挟むことができます。
