# Advent Of Code 2022

Written in TypeScript for learning purposes. Focus on code readability, not performance.

## How to run?

First, install dependencies with:

`npm ci`

The solution for each day can be run separately with:

`npm run <day_num>` (for example `npm run 01`)

Run all unit tests with:

`npm run test`

## Project structure

The directory for each day contains the following files:

- `solution.ts`
  - has functions `part1()` and `part2()`. These functions solve the problem and print the solution for the day.
- `run.ts`
  - runs the `part1()` and `part2()` functions from `solution.ts`
  - called by the `npm run <day_num>` script in package.json
- `input.txt`
- `README.md` - problem description

For some days, there are additional `*.ts` files for better code organization.
