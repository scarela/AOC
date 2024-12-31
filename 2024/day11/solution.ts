import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();

function part1() {
  const blinks = 25;
  let numbers = data.match(/\d+/g)?.reduce((acc: Record<string, number>, k) => {
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {}) ?? {};

  for (let i = 1; i <= blinks; i++) {
    const current: Record<string, number> = {};

    for (const [k, v] of Object.entries(numbers)) {
      if (k === '0') {
        current["1"] = v;
      } else if (k.length % 2 === 0) {
        const [a, b] = [+k.slice(0, k.length / 2), +k.slice(k.length / 2)];
        current[a] = (current[a] ?? 0) + v;
        current[b] = (current[b] ?? 0) + v;
      } else {
        const str = +k * 2024;
        current[str] = v;
      }
    }

    numbers = { ...current };
  }

  return Object.values(numbers).reduce((acc, v) => acc + v, 0);
}

console.log("Day 11 - Part 1:", part1());

function part2() {
  let blinks = 75;
  let index = 1;
  let numbers = data.match(/\d+/g)?.reduce((acc: Record<string, number>, n) => {
    acc[n] = acc[n] ?? 0 + 1;
    return acc;
  }, {}) ?? {};

  while (index <= blinks) {
    const current: Record<string, number> = {};
    Object.entries(numbers)
      .forEach(([k, v]) => {

        if (k === '0') {
          current["1"] = v;
        } else if (k.length % 2 === 0) {
          const [a, b] = [k.slice(0, k.length / 2), k.slice(k.length / 2)];
          current[+a] = (current[+a] ?? 0) + v;
          current[+b] = (current[+b] ?? 0) + v;
        } else {
          const str = +k * 2024;
          current[str] = v;
        }
      });
    index++;
    numbers = { ...current };
  }

  return Object.values(numbers).reduce((acc, n) => acc + n, 0);
}

console.log("Day 11 - Part 2:", part2());