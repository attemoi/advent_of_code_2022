interface Range {
  start: number;
  end: number;
}

export function part1(inputLines: string[]): void {
  const numOfPairs = inputLines.filter((pair) => {
    const [elf1, elf2] = pair.split(",");
    const range1 = toRange(elf1);
    const range2 = toRange(elf2);
    return rangeContainsAnother(range1, range2) || rangeContainsAnother(range2, range1);
  }).length;

  console.log(`In ${numOfPairs} assignment pairs, one range fully contains the other.`);
}

export function part2(inputLines: string[]): void {
  const numOfPairs = inputLines.filter((pair) => {
    const [elf1, elf2] = pair.split(",");
    const range1 = toRange(elf1);
    const range2 = toRange(elf2);
    return rangesOverlap(range1, range2);
  }).length;

  console.log(`In ${numOfPairs} assignment pairs, the ranges overlap.`);
}

function toRange(input: string): Range {
  const [start, end] = input.split("-").map(Number);
  return { start, end };
}

function rangeContainsAnother(range1: Range, range2: Range): boolean {
  return range2.start >= range1.start && range2.end <= range1.end;
}

export function rangesOverlap(range1: Range, range2: Range): boolean {
  return (
    (range1.start <= range2.end && range1.end >= range2.start) ||
    (range2.start <= range1.end && range2.end >= range1.start)
  );
}
