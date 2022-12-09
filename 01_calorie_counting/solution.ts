export function part1(inputLines: string[]): void {
  console.log(`top elf: ${calculateCaloriesForTopElves(inputLines, 1)}`);
}

export function part2(inputLines: string[]): void {
  console.log(`top three elves total: ${calculateCaloriesForTopElves(inputLines, 3)}`);
}

function calculateCaloriesForTopElves(elves: string[], numberOfElves: number): number {
  return elves
    .map((singleElfInput) => calculateCaloriesForSingleElf(singleElfInput))
    .sort((a, b) => b - a)
    .slice(0, numberOfElves)
    .reduce((elf1, elf2) => elf1 + elf2);
}

function calculateCaloriesForSingleElf(singleElfInput: string): number {
  return singleElfInput
    .split("\n")
    .map((line) => Number(line))
    .reduce((calories1, calories2) => calories1 + calories2);
}
