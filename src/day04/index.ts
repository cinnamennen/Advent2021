import run from "aocrunner";
import { transpose } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");
  const numbers = lines[0].split(",").map((n) => parseInt(n));
  delete lines[0];
  let bingos = [];
  let i = 0;
  while (i < lines.length - 6) {
    bingos.push(
      lines.slice(i + 2, i + 7).map((r) =>
        r
          .trim()
          .replaceAll(/\s+/gi, " ")
          .split(" ")
          .map((n) => parseInt(n)),
      ),
    );
    i += 6;
  }
  return [numbers, bingos] as const;
};

const part1 = (rawInput: string) => {
  const [numbers, boards] = parseInput(rawInput);
  const drawn = new Set();
  numbers.reverse();
  let good;
  let called;
  while (numbers.length > 0) {
    called = numbers.pop();
    drawn.add(called);
    const winners = boards.filter(
      (board) =>
        board.some((row) => row.every((num) => drawn.has(num))) ||
        transpose(board).some((row) => row.every((num) => drawn.has(num))),
    );
    if (winners.length > 0) {
      good = winners[0];
      break;
    }
  }

  if (!good){
    throw new Error('No bingo won')
  }

  if (!called){
    throw new Error('Things got weird')
  }
  const remaining = good.map(row=> row.filter(num=> !drawn.has(num)).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0)
  return remaining * called;
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7
        `,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7
        `,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
