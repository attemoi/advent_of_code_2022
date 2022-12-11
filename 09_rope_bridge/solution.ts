interface Vector {
  x: number;
  y: number;
}

interface Move {
  [name: string]: Vector;
}

const MOVES: Move = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
} as const;

class Knot {
  position: Vector;
  tail: Knot | null;

  constructor(position: Vector) {
    this.position = position;
    this.tail = null;
  }

  addTail(knot: Knot): Knot {
    this.tail = new Knot({ ...this.position });
    return this.tail;
  }

  move(vector: Vector): void {
    this.position.x += vector.x;
    this.position.y += vector.y;

    if (this.tail === null || this.isTouching(this.tail)) {
      return;
    }

    // Move diagonally towards this knot
    this.tail.move({
      x: this.limitToOneStep(this.position.x - this.tail.position.x),
      y: this.limitToOneStep(this.position.y - this.tail.position.y),
    });
  }

  private limitToOneStep(num: number): number {
    return Math.max(-1, Math.min(num, 1));
  }

  private isTouching(other: Knot): boolean {
    const xDistance = this.position.x - other.position.x;
    const yDistance = this.position.y - other.position.y;
    return Math.abs(xDistance) < 2 && Math.abs(yDistance) < 2;
  }
}

class RopeSimulation {
  tailPositionHistory: Vector[] = [];

  readonly ORIGIN: Vector = { x: 0, y: 0 };

  private readonly head: Knot = new Knot({ ...this.ORIGIN });
  private readonly tail: Knot;

  constructor(numberOfKnots: number) {
    this.tail = this.head.addTail(new Knot({ ...this.ORIGIN }));
    for (let i = 0; i < numberOfKnots - 2; i++) {
      this.tail = this.tail.addTail(new Knot({ ...this.ORIGIN }));
    }
  }

  moveHead(vector: Vector): void {
    this.head.move(vector);

    this.tailPositionHistory.push({ ...this.tail.position });
  }
}

export function part1(inputLines: string[]): void {
  const numberOfKnots = 2;
  const simulation: RopeSimulation = new RopeSimulation(numberOfKnots);
  inputLines.flatMap(parseMoves).forEach((vector) => simulation.moveHead(vector));
  console.log(`Unique tail positions: ${getUniqueTailPositions(simulation)}`);
}

export function part2(inputLines: string[]): void {
  const numberOfKnots = 10;
  const simulation: RopeSimulation = new RopeSimulation(numberOfKnots);
  inputLines.flatMap(parseMoves).forEach((vector) => simulation.moveHead(vector));
  console.log(`Unique tail positions: ${getUniqueTailPositions(simulation)}`);
}

function parseMoves(input: string): Vector[] {
  const [move, amount] = input.split(" ");
  return Array(Number(amount)).fill(MOVES[move]);
}

function getUniqueTailPositions(simulation: RopeSimulation): number {
  return new Set(simulation.tailPositionHistory.map((pos) => `${pos.x} ${pos.y}`)).size;
}
