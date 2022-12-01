import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((u) => u.split(""));

function transpose(array: Array<Array<unknown>>) {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invert = transpose(input);
  const counts = invert.map((r) => [
    r.filter((bit) => bit == "0").length,
    r.filter((bit) => bit == "1").length,
  ]);
  const gamma = counts.map(([zero, one]) => (zero > one ? "0" : "1")).join("");
  const epsilon = ~parseInt(gamma, 2) & (Math.pow(2, gamma.length) - 1);
  return parseInt(gamma, 2) * epsilon;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invert = transpose(input);
  invert.map((r) => [
    r.filter((bit) => bit == "0").length,
    r.filter((bit) => bit == "1").length,
  ]);
  let ox = input;
  let pos = 0;
  while (ox.length > 1) {
    const common = transpose(ox)
      .map((r) => [
        r.filter((bit) => bit == "0").length,
        r.filter((bit) => bit == "1").length,
      ])
      .map(([zero, one]) => (one >= zero ? "1" : "0"));
    ox = ox.filter((reading) => reading[pos] == common[pos]);
    pos++;
  }
  let co = input;
  pos = 0;
  while (co.length > 1) {
    const common = transpose(co)
      .map((r) => [
        r.filter((bit) => bit == "0").length,
        r.filter((bit) => bit == "1").length,
      ])
      .map(([zero, one]) => (zero <= one ? "0" : "1"));
    co = co.filter((reading) => reading[pos] == common[pos]);
    pos++;
  }

  return parseInt(ox[0].join(""), 2) * parseInt(co[0].join(""), 2);
};
const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
