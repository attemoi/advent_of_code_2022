interface Tree {
  height: number;
  row: number;
  column: number;
}

interface Forest {
  trees: Tree[][];
}

interface Direction {
  col: -1 | 0 | 1;
  row: -1 | 0 | 1;
}

const DIRECTIONS: Direction[] = [
  { col: 0, row: -1 }, // UP
  { col: 0, row: 1 }, // DOWN
  { col: -1, row: 0 }, // LEFT
  { col: 1, row: 0 }, // RIGHT
];

export function part1(input: string): void {
  const forest = parseForest(input);
  const allTrees = forest.trees.flatMap((row) => row);

  const numberOfTreesVisibleFromOutside: number = allTrees.filter((tree) => isVisibleFromOutside(tree, forest)).length;

  console.log(`Number of trees visible from outside of the forest: ${numberOfTreesVisibleFromOutside}`);
}

export function part2(input: string): void {
  const forest = parseForest(input);
  const allTrees = forest.trees.flatMap((row) => row);

  const scenicScore = Math.max(...allTrees.map((tree) => calculateScenicScore(tree, forest)));
  console.log(`The highest possible scenic score is ${scenicScore}`);
}

function parseForest(input: string): Forest {
  const trees = input
    .split("\n")
    .map((rowAsString, rowIndex) =>
      Array.from(rowAsString).map((num, columnIndex) => ({ height: Number(num), row: rowIndex, column: columnIndex }))
    );
  return { trees };
}

function isVisibleFromOutside(tree: Tree, forest: Forest): boolean {
  return (
    DIRECTIONS.find((direction) => !treeOfEqualHeightOrHigherExistsInDirection(direction, tree, forest)) !== undefined
  );
}

function treeOfEqualHeightOrHigherExistsInDirection(direction: Direction, tree: Tree, forest: Forest): boolean {
  let cursor: Tree | undefined = { ...tree };
  while ((cursor = forest.trees[cursor.row + direction.row]?.[cursor.column + direction.col]) !== undefined) {
    if (cursor.height >= tree.height) {
      return true;
    }
  }
  return false;
}

function calculateScenicScore(tree: Tree, forest: Forest): number {
  return DIRECTIONS.map((direction) => calculateViewDistance(tree, forest, direction)).reduce((a, b) => a * b);
}

function calculateViewDistance(tree: Tree, forest: Forest, direction: Direction): number {
  let cursor: Tree | undefined = { ...tree };
  let distance = 0;
  while ((cursor = forest.trees[cursor.row + direction.row]?.[cursor.column + direction.col]) !== undefined) {
    distance++;
    if (cursor.height >= tree.height) {
      return distance;
    }
  }
  return distance;
}
