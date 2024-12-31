import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();

function part1() {
  let index = 0;
  const steps = 25;
  const numbers = data.match(/\d+/g)?.map(Number) ?? [];

  while (index < steps) {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === 0) {
        numbers[i] = 1;
      } else if (String(numbers[i]).length % 2 === 0) {
        const str = String(numbers[i]);
        numbers[i] = +str.slice(0, str.length / 2);
        numbers.splice(i + 1, 0, +str.slice(str.length / 2))
        i++;
      } else {
        numbers[i] *= 2024;
      }
    }
    index++;
  }

  return numbers.length;
}

console.log("Day 11 - Part 1:", part1());

function part2() {
  return 0
}

console.log("Day 11 - Part 2:", part2());