export interface Stack {
  crates: string[];
}

export interface Move {
  numOfCrates: number;
  from: number;
  to: number;
}

interface Crane {
  moveCrates: (amount: number, from: Stack, to: Stack) => void;
}

class CrateMover9000 implements Crane {
  // Moves single crate at a time
  moveCrates(amount: number, from: Stack, to: Stack): void {
    for (let i = 0; i < amount; i++) {
      const crateBeingMoved = from.crates.pop();
      if (crateBeingMoved !== undefined) {
        to.crates.push(crateBeingMoved);
      }
    }
  }
}

class CrateMover9001 implements Crane {
  // Moves multiple crates at once
  moveCrates(amount: number, from: Stack, to: Stack): void {
    const cratesBeingMoved = from.crates.splice(-amount);
    to.crates.push(...cratesBeingMoved);
  }
}

export function part1(input: string): void {
  performRearrangement(new CrateMover9000(), input);
}

export function part2(input: string): void {
  performRearrangement(new CrateMover9001(), input);
}

export function performRearrangement(crane: Crane, input: string): void {
  const [stacksInput, movesInput] = input.split("\n\n");

  const stacks: Stack[] = parseStacks(stacksInput);
  const moves: Move[] = parseMoves(movesInput);

  performMoves(crane, moves, stacks);

  const cratesOnTopOfEachStack = stacks.map((stack) => stack.crates.at(-1)).join("");
  console.log(`The crates on top of each stack are ${cratesOnTopOfEachStack}`);
}

export function parseStacks(stacksInput: string): Stack[] {
  const rows: string[] = stacksInput.split("\n");

  const columnPositions: number[] = getIndexOfEachStackNumber(rows.at(-1) as string);

  return columnPositions.map((columnIndex) => ({ crates: readColumn(columnIndex, stacksInput) }));
}

export function getIndexOfEachStackNumber(input: string): number[] {
  const regex = /\d+/g; // "g" flag to search for all matches
  const matches = input.match(regex);
  if (matches == null) {
    return [];
  }
  return matches.map((match) => input.indexOf(match));
}

/**
 * Read a column in a multi-line string
 * @param columnIndex
 * @param input
 * @returns an array with the item on top as the last item
 */
export function readColumn(columnIndex: number, input: string): string[] {
  return input
    .split("\n")
    .map((line) => line.charAt(columnIndex))
    .filter((value) => value.trim().length > 0)
    .reverse();
}

function parseMoves(movesInput: string): Move[] {
  return movesInput.split("\n").map(parseMove);
}

export function parseMove(input: string): Move {
  const [numOfCrates, from, to] = input.match(/\d+/g)?.map(Number) as number[];
  return { numOfCrates, from: from - 1, to: to - 1 };
}

function performMoves(crane: Crane, moves: Move[], stacks: Stack[]): void {
  moves.forEach((move) => {
    crane.moveCrates(move.numOfCrates, stacks[move.from], stacks[move.to]);
  });
}
