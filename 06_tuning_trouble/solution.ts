export function part1(input: string): void {
  const markerLength = 4;
  const firstMarkerIndex = getIndexOfFirstMarker(input, markerLength);
  const charactersProcessed = (firstMarkerIndex as number) + markerLength;

  console.log(
    `${charactersProcessed} characters need to be processed before the first start-of-packet marker is detected.`
  );
}

export function part2(input: string): void {
  const markerLength = 14;
  const firstMarkerIndex = getIndexOfFirstMarker(input, markerLength);
  const charactersProcessed = (firstMarkerIndex as number) + markerLength;

  console.log(
    `${charactersProcessed} characters need to be processed before the first start-of-message marker is detected.`
  );
}

export function getIndexOfFirstMarker(input: string, markerLength: number): number | undefined {
  for (let i = 0; i <= input.length - markerLength; i++) {
    if (!containsDuplicates(input.slice(i, i + markerLength))) {
      return i;
    }
  }
}

export function containsDuplicates(input: string): boolean {
  const uniqueLetters = [...new Set(input)];
  return input.length !== uniqueLetters.length;
}
