import { file, resolveSync } from "bun";

// const data = `199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263`;
const data = await file(resolveSync("./input", import.meta.dir)).text();
const depthMeasurements = data.match(/\d+/g)?.map((n) => +n) ?? [];

function part1() {
  let result = 0;

  for (let i = 1; i < depthMeasurements.length; i++) {
    if (depthMeasurements[i - 1] < depthMeasurements[i]) result++;
  }

  return result;
}

console.log("Day 1 - Part 1:", part1());

function part2(dm = depthMeasurements) {
  let result = 0;
  let prevSum = dm[0] + dm[1] + dm[2];

  for (let i = 3; i < depthMeasurements.length; i++) {
    const currentSum = prevSum - dm[i - 3] + dm[i];
    // console.log(currentSum);
    if (prevSum < currentSum) result++;
    prevSum = currentSum;
  }

  return result;
}

console.log("Day 1 - Part 2:", part2());
