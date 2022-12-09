import { readFileSync } from "fs";

export function readLinesInFile(filePath: string): string[] {
  return readFileSync(filePath, "utf-8").trim().split("\n");
}
