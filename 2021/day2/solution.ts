import { file, resolveSync } from "bun";

// const data = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2`; //p1:150 - p2:900
const data = await file(resolveSync("./input", import.meta.dir)).text();

function part1() {
  const { depth, forward } = data.split("\n").reduce(
    (acc: { depth: number; forward: number }, cmd: string) => {
      const [dir, units] = cmd.split(" ");
      if (dir === "down") acc.depth += +units;
      else if (dir === "up") acc.depth -= +units;
      else acc.forward += +units;

      return acc;
    },
    { depth: 0, forward: 0 },
  );
  return depth * forward;
}

console.log("Day 2 - Part 1:", part1());

function part2() {
  const { depth, forward } = data.split("\n").reduce(
    (acc: { depth: number; forward: number; aim: number }, cmd: string) => {
      const [dir, units] = cmd.split(" ");
      if (dir === "down") acc.aim += +units;
      else if (dir === "up") acc.aim -= +units;
      else {
        acc.depth += +units * acc.aim;
        acc.forward += +units;
      }
      return acc;
    },
    { depth: 0, forward: 0, aim: 0 },
  );
  return depth * forward;
}

console.log("Day 2 - Part 2:", part2());
