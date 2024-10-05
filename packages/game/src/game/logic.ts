import { Player, BOARD_SIZE } from '@/consts/game';
import { type BitBoard, type CellPosition } from '@/types/game';

export const INITIAL_BOARD: BitBoard = {
  player1:
    0b000000000_000000000_000010000_000000000_000101000_000000000_000010000_000000000_000000000n,
  player2:
    0b000000000_000000000_000000000_000100000_001000100_000001000_000000000_000000000_000000000n,
  player3:
    0b000000000_000000000_001000000_000010000_000000000_000010000_000000100_000000000_000000000n,
};

const INSIDE_BOARD =
  0b111110000_111111000_111111100_111111110_111101111_011111111_001111111_000111111_000011111n;

const FLIP_DIRECTIONS: { bitShift: bigint; edgeGuard: bigint }[] = [
  // 左右
  {
    bitShift: 1n,
    edgeGuard:
      0b011100000_011110000_011111000_011111100_011000110_001111110_000111110_000011110_000001110n,
  },
  // 上下
  {
    bitShift: 9n,
    edgeGuard:
      0b000000000_111110000_111111000_111101100_011101110_001101111_000111111_000011111_000000000n,
  },
  // 左斜め
  {
    bitShift: 10n,
    edgeGuard:
      0b000000000_011111000_011111100_011011110_011101110_011110110_001111110_000111110_000000000n,
  },
];

/**
 * @see {@link https://blog.qmainconts.dev/articles/yxiplk2_dd | 【オセロ】ビットボードで石を置ける場所を計算して、ビットボードの凄さに触れよう}
 */
export const makeLegalBoard = (board: BitBoard, turn: Player): bigint => {
  const filledBoard = board.player1 | board.player2 | board.player3;
  const playerBoard = getCurrentPlayerBoard(board, turn);
  const opponentBoard = filledBoard & ~playerBoard;
  const blankBoard = ~filledBoard & INSIDE_BOARD;

  let legalBoard = 0n;

  for (const direction of FLIP_DIRECTIONS) {
    {
      let tmpBoard = (playerBoard << direction.bitShift) & opponentBoard & direction.edgeGuard;
      for (let i = 0; i < BOARD_SIZE - 3; i++) {
        tmpBoard |= (tmpBoard << direction.bitShift) & opponentBoard & direction.edgeGuard;
      }
      legalBoard |= (tmpBoard << direction.bitShift) & blankBoard;
    }

    {
      let tmpBoard = (playerBoard >> direction.bitShift) & opponentBoard & direction.edgeGuard;
      for (let i = 0; i < BOARD_SIZE - 3; i++) {
        tmpBoard |= (tmpBoard >> direction.bitShift) & opponentBoard & direction.edgeGuard;
      }
      legalBoard |= (tmpBoard >> direction.bitShift) & blankBoard;
    }
  }

  return legalBoard;
};

export const toBitMove = (rowMove: CellPosition): bigint => {
  const lastCellBit = 1n;
  const shiftByY = BOARD_SIZE * (BOARD_SIZE - rowMove.y - 1);
  const shiftByX = BOARD_SIZE - rowMove.x - 1;

  return lastCellBit << BigInt(shiftByY + shiftByX);
};

/**
 * 指定した場所に着手して次の着手可能なプレイヤーまで手番を進める
 * @throws ひっくり返せる石がない場合はエラーする
 */
export const makeMove = (
  board: BitBoard,
  turn: Player,
  move: bigint,
): { board: BitBoard; turn: Player; skippedTurns: Player[]; isEnd: boolean } => {
  const newBoard = flipStones(board, turn, move);
  const newTurnInfo = changeTurn(newBoard, turn);

  return { board: newBoard, ...newTurnInfo };
};

const getCurrentPlayerBoard = (board: BitBoard, turn: Player): bigint => {
  switch (turn) {
    case Player.PLAYER_1:
      return board.player1;
    case Player.PLAYER_2:
      return board.player2;
    case Player.PLAYER_3:
      return board.player3;
  }
};

/**
 * @throws ひっくり返せる石がない場合はエラーする
 * @see {@link https://qiita.com/sensuikan1973/items/459b3e11d91f3cb37e43#着手し石を反転する | オセロをビットボードで実装する#着手し石を反転する}
 */
const flipStones = (board: BitBoard, turn: Player, move: bigint): BitBoard => {
  const filledBoard = board.player1 | board.player2 | board.player3;
  const playerBoard = getCurrentPlayerBoard(board, turn);
  const opponentBoard = filledBoard & ~playerBoard;

  let flipCells = 0n;

  for (const direction of FLIP_DIRECTIONS) {
    {
      let tmpFlipCells = 0n;
      let searchCell = move << direction.bitShift;
      while (searchCell & opponentBoard & direction.edgeGuard) {
        tmpFlipCells |= searchCell;
        searchCell <<= direction.bitShift;
      }
      if (searchCell & playerBoard) flipCells |= tmpFlipCells;
    }

    {
      let tmpFlipCells = 0n;
      let searchCell = move >> direction.bitShift;
      while (searchCell & opponentBoard & direction.edgeGuard) {
        tmpFlipCells |= searchCell;
        searchCell >>= direction.bitShift;
      }
      if (searchCell & playerBoard) flipCells |= tmpFlipCells;
    }
  }

  if (!flipCells) throw new Error('指定した着手は非合法です。');

  return (() => {
    switch (turn) {
      case Player.PLAYER_1:
        return {
          player1: board.player1 | move | flipCells,
          player2: board.player2 & ~flipCells,
          player3: board.player3 & ~flipCells,
        };
      case Player.PLAYER_2:
        return {
          player1: board.player1 & ~flipCells,
          player2: board.player2 | move | flipCells,
          player3: board.player3 & ~flipCells,
        };
      case Player.PLAYER_3:
        return {
          player1: board.player1 & ~flipCells,
          player2: board.player2 & ~flipCells,
          player3: board.player3 | move | flipCells,
        };
    }
  })();
};

const getNextTurn = (turn: Player): Player => {
  switch (turn) {
    case Player.PLAYER_1:
      return Player.PLAYER_2;
    case Player.PLAYER_2:
      return Player.PLAYER_3;
    case Player.PLAYER_3:
      return Player.PLAYER_1;
  }
};

/** 次の着手可能なプレイヤーまで手番を進める */
const changeTurn = (
  board: BitBoard,
  turn: Player,
): { turn: Player; skippedTurns: Player[]; isEnd: boolean } => {
  let _turn = turn;
  const skippedTurns: Player[] = [];

  // eslint-disable-next-line -- 必要な while (true) によるループ
  while (true) {
    _turn = getNextTurn(_turn);
    if (makeLegalBoard(board, _turn)) return { turn: _turn, skippedTurns, isEnd: false };
    skippedTurns.push(_turn);
    if (skippedTurns.length === 3) return { turn: _turn, skippedTurns, isEnd: true };
  }
};
