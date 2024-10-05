import { Player } from '@/consts/game';

import * as game from './logic';

describe('makeLegalBoard', () => {
  test('正常に動作する', () => {
    expect(game.makeLegalBoard(game.INITIAL_BOARD, Player.PLAYER_1)).toBe(
      0b000000000_000000000_000100000_000000000_010000010_000000000_000001000_000000000_000000000n,
    );
  });
});

describe('toBitMove', () => {
  test('正常に動作する', () => {
    expect(game.toBitMove({ x: 8, y: 8 })).toBe(1n);
  });
});

describe('makeMove', () => {
  test('通常の場合に正常に動作する', () => {
    expect(
      game.makeMove(game.INITIAL_BOARD, Player.PLAYER_1, game.toBitMove({ x: 1, y: 4 })),
    ).toEqual({
      board: {
        player1:
          0b000000000_000000000_000010000_000000000_011101000_000000000_000010000_000000000_000000000n,
        player2:
          0b000000000_000000000_000000000_000100000_000000100_000001000_000000000_000000000_000000000n,
        player3:
          0b000000000_000000000_001000000_000010000_000000000_000010000_000000100_000000000_000000000n,
      },
      turn: Player.PLAYER_2,
      skippedTurns: [],
      isEnd: false,
    });
  });

  test('着手が合法でないときにエラーを出す', () => {
    expect(() =>
      game.makeMove(game.INITIAL_BOARD, Player.PLAYER_1, game.toBitMove({ x: 0, y: 0 })),
    ).toThrowError();
  });

  test('パスが発生する場合に正常に動作する', () => {
    const newGameState = game.makeMove(
      { player1: 0b10n, player2: 0b100n, player3: 0b1n },
      Player.PLAYER_1,
      0b1000n,
    );
    expect(newGameState.turn).toBe(Player.PLAYER_3);
    expect(newGameState.skippedTurns).toEqual([Player.PLAYER_2]);
  });

  test('ゲーム終了時に正常に動作する', () => {
    expect(
      game.makeMove({ player1: 0b1n, player2: 0b10n, player3: 0n }, Player.PLAYER_1, 0b100n).isEnd,
    ).toBe(true);
  });
});
