export interface ResultScore {
  [result: string]: number;
}

export type Move = "ROCK" | "PAPER" | "SCISSORS";

export type MoveScore = {
  [move in Move]: number;
};

export const SCORES_BY_RESULT: ResultScore = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
} as const;

export const SCORES_BY_MOVE: MoveScore = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

export interface Symbol {
  [symbol: string]: Move;
}

export const MOVES_BY_SYMBOL: Symbol = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

export type Result = "LOSE" | "DRAW" | "WIN";

export interface ResultSymbol {
  [symbol: string]: Result;
}

export const WANTED_RESULTS_BY_SYMBOL: ResultSymbol = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};
