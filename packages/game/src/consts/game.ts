export const BOARD_SIZE = 9;

export const Player = {
  PLAYER_1: 0,
  PLAYER_2: 1,
  PLAYER_3: 2,
} as const;
export type Player = (typeof Player)[keyof typeof Player];
