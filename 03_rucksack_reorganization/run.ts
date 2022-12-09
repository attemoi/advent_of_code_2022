import { join } from "path";
import { readLinesInFile } from "../utils/utils";
import { part1, part2 } from "./solution";

const lines = readLinesInFile(join(__dirname, "./input.txt"));

part1(lines);
part2(lines);
