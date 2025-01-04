import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = (await file(resolveSync("./input.test", import.meta.dir)).text()).trim();
const report = data.split('\n').map(l => [l.match(/-?\d+/g)?.map(Number) ?? []]);

function extrapolate(history_lists: number[][][]) {
  let result = 0;

  for (let history of history_lists) {
    let level = 0;

    while (true) {
      const temp = [];

      for (let i = 1; i < history[level].length; i++) {
        const difference = history[level][i] - history[level][i - 1];
        temp.push(difference)
      }

      if (new Set(temp).size === 1) {
        result += temp[0];
        break;
      }
      history.push(temp);
      level++;
    }

    result += history.reduce((acc, h) => acc + h.at(-1)!, 0)
  }

  return result;
}

function part1() {
  return extrapolate(report)

}

console.log("Day 9 - Part 1:", part1());

function part2() {
  return extrapolate(report.map(r => [r[0].reverse()]));
}

console.log("Day 9 - Part 2:", part2());