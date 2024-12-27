import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
const calibrations = data.split('\n').reduce((arr, l) => {
  const [key, ...numbers] = l.match(/\d+/g)?.map(Number) ?? [];
  arr.push([key, numbers]);
  return arr;
}, [] as [number, number[]][]);

function allPossibleResults(nums: number[]): Set<number> {
  let dp = new Set<number>([nums[0]]);

  for (let i = 1; i < nums.length; i++) {
    const nextNum = nums[i];
    const newDp = new Set<number>();

    for (const val of dp) {
      // '+'
      newDp.add(val + nextNum);
      // '*'
      newDp.add(val * nextNum);
      // '||'
      newDp.add(Number(String(val) + String(nextNum)));
    }

    dp = newDp;
    // Optional short-circuit if set gets huge or if you have a reason to stop early
    // e.g., if (dp.size > someLimit) break;
  }

  return dp;
}

function solution() {
  let calibrationResult = 0;
  
  for (const [key, calibration] of calibrations) {
    const possible = allPossibleResults(calibration);
    if (possible.has(key)) {
      calibrationResult += key;
    }
  }

  return calibrationResult;
}

console.log(solution());
