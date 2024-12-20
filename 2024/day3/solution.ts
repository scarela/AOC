import { file, resolveSync } from "bun";

// const data =
//   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const data = await file(resolveSync("./input", import.meta.dir)).text();

function part1() {
  let result = 0;
  const mulList = data
    .split("\n")
    .map((line) =>
      [...line.matchAll(/mul\((\d+),(\d+)\)/g)].map((mul) =>
        mul.slice(1).map((n) => +n),
      ),
    )
    .flat();

  for (const mul of mulList) {
    result += mul[0] * mul[1];
  }

  return result;
}

console.log("Day 3 - Part 1:", part1());

const data2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function part2() {
  const list = data.match(/(don't\(\)|do\(\)|mul\(\d+,\d+\))/g) ?? [];
  let result = 0;
  let enabled = true;

  const multiplyMul = (mul: string) => {
    const numbers = mul.match(/\d+/g)?.map((n) => +n) ?? [];

    return numbers[0] * numbers[1];
  };

  for (const segment of list) {
    if (enabled && segment.includes("mul")) result += multiplyMul(segment);
    if (enabled && segment === "don't()") enabled = false;
    if (!enabled && segment === "do()") enabled = true;
  }

  return result;
}

console.log("Day 3 - Part 2:", part2());
