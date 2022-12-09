import { describe, expect, test } from "@jest/globals";
import { rangesOverlap } from "./solution";

describe("Day 4", () => {
  test("rangesOverlap", () => {
    expect(rangesOverlap({ start: 1, end: 2 }, { start: 2, end: 3 })).toBeTruthy();
    expect(rangesOverlap({ start: 2, end: 3 }, { start: 1, end: 2 })).toBeTruthy();

    expect(rangesOverlap({ start: 1, end: 2 }, { start: 3, end: 4 })).toBeFalsy();
    expect(rangesOverlap({ start: 3, end: 4 }, { start: 1, end: 2 })).toBeFalsy();
  });
});
