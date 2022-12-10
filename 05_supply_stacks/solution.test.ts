import { describe, expect, test } from "@jest/globals";
import { getIndexOfEachStackNumber, parseMove, parseStacks, readColumn } from "./solution";

describe("Day 5", () => {
  test("getIndexOfEachStackNumber", () => {
    expect(getIndexOfEachStackNumber(" 1  2  3 ")).toEqual([1, 4, 7]);
  });

  test("readColumn", () => {
    // prettier-ignore
    const input = [
      "ab",
      "  ",
      "cd",
    ].join('\n');
    expect(readColumn(1, input)).toEqual(["d", "b"]);
  });

  test("parseStacks", () => {
    // prettier-ignore
    const stacksInput = [
      "    [c]",
      "[a] [d]",
      "[b] [e]",
      " 1   2 "
    ].join('\n');

    expect(parseStacks(stacksInput)).toEqual([{ crates: ["1", "b", "a"] }, { crates: ["2", "e", "d", "c"] }]);
  });

  test("parseMove", () => {
    expect(parseMove("move 1 from 4 to 6")).toEqual({ numOfCrates: 1, from: 3, to: 5 });
  });
});
