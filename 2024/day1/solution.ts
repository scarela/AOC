import { file, resolveSync } from "bun";

interface Lists {
  l1: number[];
  l2: number[];
}

const data = await file(resolveSync("./input", import.meta.dir)).text();
const formatted = data.match(/\d+/g)?.map((n) => +n) || [];
const numbers: Lists = {
  l1: [],
  l2: [],
};
for (let i = 0; i < formatted?.length; i += 2) {
  numbers.l1.push(formatted[i]);
  numbers.l2.push(formatted[i + 1]);
}

function part1() {
  let result = 0;

  const sortedL1 = [...numbers.l1].sort();
  const sortedL2 = [...numbers.l2].sort();

  for (let i = 0; i < sortedL1.length; i++) {
    result += Math.abs(sortedL1[i] - sortedL2[i]);
  }

  return result;
}

console.log("Day 1 - Part 1: ", part1());

function part2() {
  const l2Freq = numbers.l2.reduce((acc, n) => {
    return acc.set(n, (acc.get(n) ?? 0) + 1);
  }, new Map<number, number>());
  let result = 0;

  for (const n of numbers.l1) {
    const freq = n * (l2Freq.get(n) ?? 0);
    result += freq;
  }

  return result;
}

console.log("Day 1 - Part 2: ", part2());
