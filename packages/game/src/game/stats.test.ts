import { Player } from '@/consts/game';

import { INITIAL_BOARD } from './logic';
import { calculateScore, calculateWinner } from './stats';

describe('calculateScore', () => {
  test('正常に動作する', () => {
    expect(calculateScore(INITIAL_BOARD)).toEqual({
      player1: 4,
      player2: 4,
      player3: 4,
    });
  });
});

describe('calculateWinner', () => {
  test('works', () => {
    expect(calculateWinner({ player1: 4, player2: 4, player3: 0 })).toEqual([
      Player.PLAYER_1,
      Player.PLAYER_2,
    ]);
  });
});
