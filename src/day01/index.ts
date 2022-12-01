import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((c) => parseInt(c));

function getIncreases(input: number[]) {
  return input.filter(
    (value, index, array) => index !== 0 && value > array[index - 1],
  ).length;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getIncreases(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const padded = [...input];
  const groups = padded.map(
    (value, index, array) => array[index] + array[index + 1] + array[index + 2],
  ).slice(0, -2);
  return getIncreases(groups);
};

let example = `
199
200
208
210
200
207
240
269
260
263
`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
