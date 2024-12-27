import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
const calibrations = data.split('\n').reduce((obj: [number, number[]][], l) => {
  const [key, ...numbers] = l.match(/\d+/g)?.map(n => +n) ?? [];
  obj.push([key, numbers]);
  return obj;
}, [] as any);

const generateOperands = (items: string[], length: number) => {
  const result = [] as string[][];

  const backtrack = (current: any[]) => {
    if (current.length === length) {
      result.push([...current]);
      return;
    }

    for (const item of items) {
      current.push(item);
      backtrack(current);
      current.pop();
    }
  }

  backtrack([]);
  return result;
}

function part1() {
  const operands = ["*", "+"];
  const cache = new Map();
  let calibrationResult = 0;
  let operandsPermutations = {} as any;

  for (const [key, calibration] of calibrations) {
    if (!operandsPermutations[calibration.length]) {
      operandsPermutations[calibration.length] = generateOperands(operands, calibration.length - 1)//.map(s => s.join(''))
    }

    for (let opList of operandsPermutations[calibration.length]) {
      let temp = 0;
      for (let i = 0; i < calibration.length - 1; i++) {
        const evalStr = (temp || calibration[i]) + opList[i] + calibration[i + 1];
        temp = cache.get(evalStr) ?? eval(evalStr);
        cache.set(evalStr, temp);
      }
      if (+key == temp) {
        calibrationResult += +key;
        break
      }
    }
  }

  return calibrationResult;
}

console.log("Day 7 - Part 1:", part1());

function part2() {
  const operands = ["*", "+", "||"];
  const cache = new Map();
  let calibrationResult = 0;
  let operandsPermutations = {} as any;

  for (const [key, calibration] of calibrations) {
    if (!operandsPermutations[calibration.length]) {
      operandsPermutations[calibration.length] = generateOperands(operands, calibration.length - 1)//.map(s => s.join(''))
    }

    for (let opList of operandsPermutations[calibration.length]) {
      let temp = 0;
      for (let i = 0; i < calibration.length - 1; i++) {
        if (opList[i] === "||") {
          temp = +((temp || calibration[i]) + "" + calibration[i + 1]);
          continue;
        }
        const evalStr = (temp || calibration[i]) + opList[i] + calibration[i + 1];
        temp = cache.get(evalStr) ?? eval(evalStr);
        cache.set(evalStr, temp);
      }
      if (+key == temp) {
        calibrationResult += +key;
        break
      }
    }
  }

  return calibrationResult;
}

console.log("Day 7 - Part 2:", part2());