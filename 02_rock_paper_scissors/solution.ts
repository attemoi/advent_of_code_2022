import { Move, MOVES_BY_SYMBOL, Result, SCORES_BY_MOVE, SCORES_BY_RESULT, WANTED_RESULTS_BY_SYMBOL } from "./types";

export function part1(games: string[]): void {
  const totalScore = games
    .filter((game) => game)
    .map((game) => calculateScoreForOneGamePart1(game))
    .reduce((a, b) => a + b);

  console.log(totalScore);
}

export function part2(games: string[]): void {
  const totalScore = games
    .filter((game) => game)
    .map((game) => calculateScoreForOneGamePart2(game))
    .reduce((a, b) => a + b);

  console.log(totalScore);
}

function calculateScoreForOneGamePart1(game: string): number {
  const [opponentSymbol, mySymbol] = game.split(" ");

  const opponentMove = MOVES_BY_SYMBOL[opponentSymbol];
  const myMove = MOVES_BY_SYMBOL[mySymbol];

  const matchScore = getScoreForMatch(myMove, opponentMove);
  const moveScore = SCORES_BY_MOVE[myMove];

  return matchScore + moveScore;
}

function calculateScoreForOneGamePart2(game: string): number {
  const [opponentMoveSymbol, wantedResultSymbol] = game.split(" ");

  const opponentMove = MOVES_BY_SYMBOL[opponentMoveSymbol];
  const wantedResult = WANTED_RESULTS_BY_SYMBOL[wantedResultSymbol];

  const matchScore = SCORES_BY_RESULT[wantedResult];
  const moveScore = SCORES_BY_MOVE[getMoveToSelect(wantedResult, opponentMove)];

  return matchScore + moveScore;
}

function getMoveToSelect(myWantedResult: Result, opponentMove: Move): Move {
  if (myWantedResult === "DRAW") {
    return opponentMove;
  }
  if (myWantedResult === "WIN") {
    switch (opponentMove) {
      case "ROCK":
        return "PAPER";
      case "PAPER":
        return "SCISSORS";
      case "SCISSORS":
        return "ROCK";
    }
  }
  switch (opponentMove) {
    case "ROCK":
      return "SCISSORS";
    case "PAPER":
      return "ROCK";
    case "SCISSORS":
      return "PAPER";
  }
}

function getScoreForMatch(myMove: Move, opponentMove: Move): number {
  if (myMove === opponentMove) {
    return SCORES_BY_RESULT.DRAW;
  }
  if (myMove === "ROCK" && opponentMove === "SCISSORS") {
    return SCORES_BY_RESULT.WIN;
  } else if (myMove === "PAPER" && opponentMove === "ROCK") {
    return SCORES_BY_RESULT.WIN;
  } else if (myMove === "SCISSORS" && opponentMove === "PAPER") {
    return SCORES_BY_RESULT.WIN;
  }
  return SCORES_BY_RESULT.LOSE;
}
