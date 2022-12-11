import { join } from "path";
import { readFile } from "../utils/utils";
import { part1, part2 } from "./solution";

const input = readFile(join(__dirname, "./input.txt"));

part1(input);
part2(input);
