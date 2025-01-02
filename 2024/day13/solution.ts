import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();
const groups = data.split('\n\n');

const cramersRule = ([ButtonAX, ButtonAY, ButtonBX, ButtonBY, priceX, priceY]: number[]) => {
  // Cramer's rule https://en.wikipedia.org/wiki/Cramer%27s_rule https://www.cuemath.com/algebra/cramers-rule/
  const det = ButtonAX * ButtonBY - ButtonAY * ButtonBX;
  const detA = ButtonAX * priceY - ButtonAY * priceX;
  const detB = ButtonBX * priceY - ButtonBY * priceX;

  const ButtonA = Math.abs(detB / det);
  if (ButtonA % 1 !== 0) return 0;
  const ButtonB = Math.abs(detA / det);
  if (ButtonB % 1 !== 0) return 0;

  return ButtonA * 3 + ButtonB;
}


function part1() {
  let result = 0;

  for (let group of groups) {
    const numbers = group.match(/\d+/g)?.map(Number) ?? [];

    result += cramersRule(numbers);
  }

  return result;
}

console.log("Day 13 - Part 1:", part1()); //29187

function part2() {
  let result = 0;

  for (let group of groups) {
    const numbers = group.match(/\d+/g)?.map(Number) ?? [];

    result += cramersRule(
      numbers
        .with(-2, numbers.at(-2)! + 1e13)
        .with(-1, numbers.at(-1)! + 1e13)
    );
  }

  return result;
}

console.log("Day 13 - Part 2:", part2()); //99968222587852