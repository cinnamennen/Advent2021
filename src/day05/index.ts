import run from "aocrunner";
import { Pt, Line } from "pts";

type Segment = [Pt, Pt];

function sortPoints(a: Pt, b: Pt) {
  return a.x - b.x != 0 ? a.x - b.x : a.y - b.y;
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map(
    (l) =>
      l
        .split(" -> ")
        .map((p) => p.split(",").map((n) => parseInt(n)))
        .map((r) => new Pt(...r))
        .sort(sortPoints) as Segment,
  );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const perp = input.filter(([a, b]) => a.x == b.x || a.y == b.y);
  let overlap: Pt[] = [];
  perp.forEach((a, index, array) =>
    array.slice(index + 1).forEach((b) => {
      overlap.push(Line.intersectLine2D(a, b));
      if (
        Line.collinear(a[0], a[1], b[0], 0) &&
        Line.collinear(a[0], a[1], b[1], 0)
      ) {
        const points = [...a, ...b];
        points.sort(sortPoints);

        if (
          (points[0].equals(a[0]) && points[1].equals(a[1])) ||
          (points[0].equals(b[0]) && points[1].equals(b[1]))
        ) {
          if (points[1].equals(points[2])) overlap.push(points[1]);
          return;
        }
        // console.log("handle collinear", a, b);
        // console.log("sorted", points);
        const [q, r] = [points[1], points[2]];
        if (q.x == r.x) {
          for (let i = q.y; i <= r.y; i++) {
            const p = new Pt(q.x, i);
            overlap.push(p);
          }
        } else if (q.y == r.y) {
          for (let i = q.x; i <= r.x; i++) {
            const p = new Pt(i, q.y);
            overlap.push(p);
          }
        } else {
          let i = q.x;
          let j = q.y;
          while (i <= r.x) {
            overlap.push(new Pt(i, j));
            i++;
            if (r.y > q.y) j++;
            else j--;
          }
        }
      }
    }),
  );
  const intersections = new Set(
    overlap.filter((o) => o != undefined).map((p) => p.toString()),
  );

  // console.log(intersections);

  return intersections.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const visited: { [key: string]: number } = {};
  input.forEach(([a, b]) => {
    if (a.x == b.x) {
      for (let i = a.y; i <= b.y; i++) {
        const point = new Pt(a.x, i);
        if (visited[point.toString()] == undefined)
          visited[point.toString()] = 0;
        visited[point.toString()] += 1;
      }
    } else if (a.y == b.y) {
      for (let i = a.x; i <= b.x; i++) {
        const point = new Pt(i, a.y);
        if (visited[point.toString()] == undefined)
          visited[point.toString()] = 0;
        visited[point.toString()] += 1;
      }
    } else {
      // console.log("going from", a.toString(), b.toString());
      for (let i = 0; i <= b.x - a.x; i++) {
        const point = new Pt(i + a.x, a.y + i * (b.y > a.y ? 1 : -1));
        // console.log(point);
        if (visited[point.toString()] == undefined)
          visited[point.toString()] = 0;
        visited[point.toString()] += 1;
      }
      // console.log("-------");
    }
  });
  // console.log(visited)
  // console.log();
  return Object.keys(visited).filter((key) => visited[key] > 1).length;
};

run({
  part1: {
    tests: [
      {
        input: `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
        expected: 5,
      },
      {
        input: `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        2,2 -> 2,3
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
