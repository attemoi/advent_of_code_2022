import { describe, expect, test } from "@jest/globals";
import { containsDuplicates, getIndexOfFirstMarker } from "./solution";

describe("Day 6", () => {
  test("containsDuplicates", () => {
    expect(containsDuplicates("aabb")).toBeTruthy();
    expect(containsDuplicates("ab")).toBeFalsy();
  });

  test("indexOfFirstMarker", () => {
    expect(getIndexOfFirstMarker("abcd", 4)).toBe(0);
    expect(getIndexOfFirstMarker("aabcd", 4)).toBe(1);
    expect(getIndexOfFirstMarker("aabcde", 4)).toBe(1);
  });
});
