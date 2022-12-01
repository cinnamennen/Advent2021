import run from "aocrunner";
import { Pt } from "pts";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((u) => u.split(" "))
    .map((u) => [u[0], parseInt(u[1])]) as Array<
    ["forward" | "up" | "down", number]
  >;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const movement = input.map(([direction, amount]) => {
    switch (direction) {
      case "down":
        return new Pt(0, amount);
      case "up":
        return new Pt(0, -amount);
      case "forward":
        return new Pt(amount, 0);
    }
  });
  const position = movement.reduce((previousValue, currentValue)=>previousValue.add(currentValue), new Pt(0,0))
  return position.x * position.y;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let aim = 0;
  const pos = new Pt(0,0)
  input.forEach(([direction, amount]) => {
    switch (direction) {
      case "down":
        aim += amount;
        break;
      case "up":
        aim -= amount;
        break;
      case "forward":
        pos.x += amount;
        pos.y += amount * aim
        break;
    }
  });


  return pos.x * pos.y;
};

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
