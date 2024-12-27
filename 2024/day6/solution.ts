import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input.test", import.meta.dir)).text();
const map = data.split('\n').map(l => l.match(/\W/g)?.map(c => c) ?? []);

const [m, n] = [map.length, map[0].length];
const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const visited = new Set();

const addPos = (r: number, c: number) => visited.add(r + "_" + c);

const findInitialPosition = () => {
  let pos: [number, number, number] = [0, 0, 0];

  for (let r of map.keys()) {
    let index = map[r].indexOf('^');
    if (index > -1) {
      pos = [r, index, 0];
      break;
    }
  }

  return pos;
}

function part1() {
  let pos = findInitialPosition();

  while (true) {
    addPos(pos[0], pos[1]);
    const [r, c] = dir[pos[2]];
    const [nextR, nextC] = [pos[0] + r, pos[1] + c];

    if (nextR >= m || nextC >= n || nextR < 0 || nextC < 0) break;

    if (map[nextR][nextC] === '#')
      pos[2] = (pos[2] + 1) % 4;
    else {
      pos[0] += r;
      pos[1] += c;
    }
  }

  return visited.size;
}

console.log("Day 6 - Part 1:", part1());

function part2() {
  let validCount = 0;
  const visitedDir = new Set();
  const possibleObstacles = [...visited] as string[];
  const INITIAL_POS = findInitialPosition();

  while (possibleObstacles.length) {
    let isLoop = false;
    let pos = INITIAL_POS;
    const [obsR, obsC, _] = possibleObstacles.pop()?.split('_') ?? [];

    while (true) {
      const [r, c] = dir[pos[2]];
      const [nextR, nextC] = [pos[0] + r, pos[1] + c];

      if (nextR >= m || nextC >= n || nextC < 0 || nextR < 0) break;

      if (map[nextR][nextC] === '#' || (nextR === +obsR && nextC === +obsC))
        pos[2] = (pos[2] + 1) % 4;
      else
        pos = [nextR, nextC, pos[2]];

      if (visitedDir.has(pos.join("_"))) {
        isLoop = true;
        break
      } else {
        visitedDir.add(pos.join('_'));
      }
    }

    visitedDir.clear();
    if (isLoop) validCount++;
  }

  return validCount;
}

console.log("Day 6 - Part 2:", part2());
