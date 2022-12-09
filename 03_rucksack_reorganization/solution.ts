export function part1(rucksacks: string[]): void {
  const sumOfPriorities = rucksacks
    .map((rucksack) => findItemInThatIsInBothCompartments(rucksack))
    .filter(isString)
    .map((item) => getPriorityForItem(item))
    .reduce((a, b) => a + b);

  console.log(sumOfPriorities);
}

export function part2(rucksacks: string[]): void {
  const groupSize = 3;

  let sumOfPriorities = 0;
  for (let i = 0; i <= rucksacks.length - groupSize; i += groupSize) {
    const rucksacksForOneGroup = rucksacks.slice(i, i + groupSize);
    const item = findItemThatExistsInAllRucksacks(rucksacksForOneGroup);
    if (item !== undefined) {
      sumOfPriorities += getPriorityForItem(item);
    }
  }

  console.log(sumOfPriorities);
}

export function isString(str: string | undefined): str is string {
  return str !== undefined;
}

export function findItemInThatIsInBothCompartments(rucksack: string): string | undefined {
  const numOfItemsPerCompartment = rucksack.length / 2;
  const compartment1 = rucksack.slice(0, numOfItemsPerCompartment);
  const compartment2 = rucksack.slice(numOfItemsPerCompartment);
  return findDuplicateLetter(compartment1, compartment2);
}

export function findItemThatExistsInAllRucksacks(rucksacks: string[]): string | undefined {
  // Go through each letter in first rucksack and check if it exists in the other rucksacks as well
  const [firstRuckSack, ...otherRucksacks] = rucksacks;
  const lettersInFirstRucksack = Array.from(firstRuckSack);
  return lettersInFirstRucksack.find((letter) => letterExistsInAllRucksacks(letter, otherRucksacks));
}

function letterExistsInAllRucksacks(letter: string, rucksacks: string[]): boolean {
  return rucksacks.every((rucksack) => rucksack.includes(letter));
}

function findDuplicateLetter(input1: string, input2: string): string | undefined {
  return findDuplicateString(Array.from(input1), Array.from(input2));
}

function findDuplicateString(array1: string[], array2: string[]): string | undefined {
  return array1.find((value) => array2.includes(value));
}

export function getPriorityForItem(item: string): number {
  // Unicode value for 'A' is 65
  // Unicode value for 'a' is 97

  // Item priority for 'a' is 1
  // Item priority for 'A' is 26

  const unicodeValue = item.charCodeAt(0);
  if (unicodeValue >= 97) {
    return unicodeValue - 96;
  }
  return unicodeValue - 65 + 27;
}
