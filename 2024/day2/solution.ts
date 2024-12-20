import { file, resolveSync } from "bun";

// const data = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;
// const data = `48 46 47 49 51 54 56
// 1 1 2 3 4 5
// 1 2 3 4 5 5
// 5 1 2 3 4 5
// 1 4 3 2 1
// 1 6 7 8 9
// 1 2 3 4 3
// 9 8 7 6 7
// 7 10 8 10 11
// 68 66 67 69 72 73 76
// 92 93 92 89 86
// 47 45 48 49 52 53
// 78 79 76 75 74 73 72 69
// 29 28 27 25 26 25 22 20`;
const data = await file(resolveSync("./input", import.meta.dir)).text();
const reports = data
  .split("\n")
  .map((line) => line.match(/\d+/g)?.map((n) => +n) ?? []);

function part1() {
  let safeCount = 0;

  for (const list of reports) {
    let increasing = false;
    let decreasing = false;
    let isSafe = true;

    for (let i = 1; i < list.length; i++) {
      const diff = Math.abs(list[i - 1] - list[i]);

      if (list[i - 1] < list[i]) increasing = true;
      else decreasing = true;

      if ((increasing && decreasing) || diff < 1 || diff > 3) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safeCount++;
      console.log(list);
    }
  }

  return safeCount;
}

console.log("Day 2 - Part 1:", part1());

function part2() {
  let safeCount = 0;

  function verify(list: number[]) {
    let increasing = false;
    let decreasing = false;
    let isSafe = true;
    let index = 0;

    while (index < list.length - 1) {
      const diff = Math.abs(list[index] - list[index + 1]);

      if (list[index] < list[index + 1]) increasing = true;
      else decreasing = true;

      if ((increasing && decreasing) || diff < 1 || diff > 3) {
        isSafe = false;
        break;
      }
      index++;
    }

    return [isSafe, index] as const;
  }

  for (const list of reports) {
    let [isSafe, index] = verify(list);

    if (!isSafe) {
      for (const i of [index - 1, index, index + 1]) {
        isSafe = verify(list.toSpliced(i, 1))[0];
        if (isSafe) break;
      }
    }

    if (isSafe) safeCount++;
  }

  return safeCount;
}

console.log("Day 2 - Part 2:", part2());
