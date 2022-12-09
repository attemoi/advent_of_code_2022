import { describe, expect, test } from "@jest/globals";
import { findItemInThatIsInBothCompartments, findItemThatExistsInAllRucksacks, getPriorityForItem } from "./solution";

describe("Day 3", () => {
  test("single item priority", () => {
    expect(getPriorityForItem("a")).toBe(1);
    expect(getPriorityForItem("z")).toBe(26);
    expect(getPriorityForItem("A")).toBe(27);
    expect(getPriorityForItem("Z")).toBe(52);
  });

  test("find duplicate letter", () => {
    expect(findItemInThatIsInBothCompartments("vJrwpWtwJgWrhcsFMMfFFhFp")).toBe("p");
    expect(findItemInThatIsInBothCompartments("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toBe("L");
  });

  test("find duplicate letter in multiple rucksacks", () => {
    expect(findItemThatExistsInAllRucksacks(["ab", "ac", "ad"])).toBe("a");
  });
});
