// https://adventofcode.com/2019/day/6
// inspired by https://0xdf.gitlab.io/adventofcode2019/6
import { file, resolveSync } from "bun";

const getData = async (path: string) => (await file(resolveSync(path, import.meta.dir)).text()).trim()

const data = await getData("./input");
// const data = await getData("./inputp2.test");

const orbits = data.split('\n').reduce((acc: Record<string, string[]>, line) => {
  const [orb1, orb2] = line.split(')');
  if (!Array.isArray(acc[orb1])) acc[orb1] = [];
  acc[orb1].push(orb2);
  return acc;
}, {});

let p2Start = '';
const orbitMap = data.split('\n')
  .reduce((map: Map<string, Set<string>>, line) => {
    const [orb1, orb2] = line.split(')');
    if (!map.get(orb1)) map.set(orb1, new Set());
    if (!map.get(orb2)) map.set(orb2, new Set());
    map.get(orb1)?.add(orb2);
    map.get(orb2)?.add(orb1);
    if (orb2 === 'YOU') p2Start = orb1;
    return map;
  }, new Map())

function countOrbits(orbit: string, count: number): number {
  if (!orbits[orbit]) return count;

  return count + orbits[orbit].reduce((acc, o) => acc + countOrbits(o, count + 1), 0)
}

function part1() {
  return countOrbits("COM", 0);
}

console.log("Day 6 - Part 1:", part1()); //273985

function findPath(orbit: string, prev: string[], count: number): number {
  if (orbits[orbit]?.indexOf('SAN') >= 0) return count;

  for (let orb of orbitMap.get(orbit)) {
    if (prev.indexOf(orb) === -1) {
      let val = findPath(orb, prev.concat(orb), count + 1);
      if (val !== 0) {
        return val;
      }
    }
  }

  return 0;
}

function part2() {
  return findPath(p2Start, ["YOU"], 0);
}

console.log("Day 6 - Part 2:", part2()); //460