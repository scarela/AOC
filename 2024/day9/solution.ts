import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();
// const data = "233313312141413140211"; //test for double digits

function part1() {
  let numberCount = 0;
  const diskMap = data.split('').reduce((acc: string[], n, i) => {
    let arr;
    if (i % 2 === 0) {
      arr = Array(+n).fill(String(i / 2));
      numberCount += +n;
    } else arr = ".".repeat(+n).split('');
    return acc.concat(arr);
  }, []);
  const map = diskMap.slice();
  let left = 0;
  let right = map.length - 1;

  while (left < numberCount) {
    if (map[left] === '.') {
      while (true) {
        if (map[right] !== '.') break;
        right--;
      }
      map[left] = map[right];
      map[right] = '.';
      right--;
    }
    left++;
  }

  return map.slice(0, numberCount).reduce((acc, n, i) => acc + (+n * i), 0)
}

console.log("Day 9 - Part 1:", part1());

function part2() {
  let diskMap = data.split('').reduce((acc: string[][], n, i) => {
    let arr = Array(+n);
    if (arr.length) acc.push(arr.fill(i % 2 === 0 ? String(i / 2) : "."))
    return acc
  }, []);
  let freedSpaceCount = 1; //keep up updated free space

  for (let i = diskMap.length - 1; i >= freedSpaceCount; i--) {
    if (diskMap[i][0] === '.') continue;

    const right = diskMap[i];
    for (let j = 0; j < i; j++) {
      const left = diskMap[j];
      if (left[0] !== '.' || right.length > left.length) continue;

      if (left.length === right.length) {
        // if same length, replace
        diskMap[j] = [...right];
      } else {
        // otherwise, split between numbers and dots
        diskMap[j].splice(0, right.length)
        diskMap.splice(j, 0, [...right]);
        i++; //to match the new array's length
      }

      //replace numbers with dots
      right.fill('.');
      freedSpaceCount++;
      break
    }
  }


  return diskMap.flat().reduce((acc, n, i) => n == '.' ? acc : acc + (+n * i), 0);
}

console.log("Day 9 - Part 2:", part2());
