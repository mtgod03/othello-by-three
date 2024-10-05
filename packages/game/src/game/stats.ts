import { Player } from '@/consts/game';
import { type BitBoard } from '@/types/game';

const getScore = (_board: bigint): number => _board.toString(2).match(/1/g)?.length ?? 0;

export const calculateScore = (
  board: BitBoard,
): { player1: number; player2: number; player3: number } => ({
  player1: getScore(board.player1),
  player2: getScore(board.player2),
  player3: getScore(board.player3),
});

/** 同点の場合もあるので返り値は勝者の配列となる */
export const calculateWinner = (score: ReturnType<typeof calculateScore>): Player[] => {
  const winners: Player[] = [];
  const maxScore = Math.max(...Object.values(score));

  if (score.player1 === maxScore) winners.push(Player.PLAYER_1);
  if (score.player2 === maxScore) winners.push(Player.PLAYER_2);
  if (score.player3 === maxScore) winners.push(Player.PLAYER_3);

  return winners;
};
