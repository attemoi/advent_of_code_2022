import { readFileSync } from "fs";

export function readLinesInFile(filePath: string): string[] {
  return readFileSync(filePath, "utf-8").trim().split("\n");
}

export function readFile(filePath: string): string {
  return readFileSync(filePath, "utf-8").trimEnd();
}
