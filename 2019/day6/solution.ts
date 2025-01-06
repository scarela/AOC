// https://adventofcode.com/2019/day/6
import { file, resolveSync } from "bun";

const getData = async (path: string) => (await file(resolveSync(path, import.meta.dir)).text()).trim()

const data = await getData("./input");
// const data = await getData("./input.test");

const orbits = data.split('\n').reduce((acc: Record<string, string[]>, line) => {
  const [orb1, orb2] = line.split(')');
  if (!Array.isArray(acc[orb1])) acc[orb1] = [];
  acc[orb1].push(orb2);
  return acc;
}, {});

const orbitMap = data.split('\n')
  .reduce((map: Map<string, string>, line) => {
    const [orb1, orb2] = line.split(')');
    return map.set(orb2, orb1);
  }, new Map())

function countOrbits(orbit: string, count: number): number {
  if (!orbits[orbit]) return count;

  return count + orbits[orbit].reduce((acc, o) => acc + countOrbits(o, count + 1), 0)
}

function part1() {
  return countOrbits("COM", 0);
}

console.log("Day 6 - Part 1:", part1()); //273985

function part2() {
  let fromYOU = orbitMap.get('YOU');
  let fromSAN = orbitMap.get('SAN');
  let youList: string[] = [];
  let sanList: string[] = [];

  while (fromYOU !== fromSAN) {
    if (!!fromYOU && orbitMap.has(fromYOU)) {
      youList.push(fromYOU);
      fromYOU = orbitMap.get(fromYOU);
    }
    else fromYOU = null;

    if (!!fromSAN && orbitMap.has(fromSAN)) {
      sanList.push(fromSAN);
      fromSAN = orbitMap.get(fromSAN);
    }
    else fromSAN = null;
  }

  let index = -1;
  let targetYOU = 0;
  let targetSAN = 0;

  while (true) {
    if (youList.at(index) !== sanList.at(index)) {
      targetYOU = youList.indexOf(youList.at(index)!);
      targetSAN = sanList.indexOf(sanList.at(index)!);
      break;
    }
    index--;
  }

  return targetYOU + 1 + targetSAN + 1;
}

console.log("Day 6 - Part 2:", part2()); //460