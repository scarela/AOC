import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();

const grid = data.split('\n').map(l => [...l])
const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const dirMap = new Map<string, number>([
  [['|', 0], ['F', 1], ['7', 3]], // going up
  [['J', 0], ['-', 1], ['7', 2]], // going right
  [['L', 1], ['|', 2], ['J', 3]], // going down
  [['L', 0], ['F', 2], ['-', 3]] // going left
].flatMap((arr, i) => [...arr].map(([symbol, j]) => [symbol + "" + i, j as number])))

const withinLimits = ([h, w]: [number, number], point: number[]) => {
  const [row, col,] = point;
  return;
}

const getInitial = (grid: string[][], animal_symbol: string) => {
  const h = grid.length;
  const w = grid[0].length;
  let p1: number[];
  let p2: number[];

  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      if (grid[row][col] === animal_symbol) {

        [p1, p2] = dir
          .map(([dr, dc], i) => [row + dr, col + dc, i])
          .filter(([row, col,]) => row >= 0 && col >= 0 && row < h && col < w)
          .filter(([r, c, going_to]) => going_to === 0 ? ['|', '7', 'F'].includes(grid[r][c]) : true) //up
          .filter(([r, c, going_to]) => going_to === 1 ? ['-', '7', 'J'].includes(grid[r][c]) : true) //right
          .filter(([r, c, going_to]) => going_to === 2 ? ['|', 'J', 'L'].includes(grid[r][c]) : true) //down
          .filter(([r, c, going_to]) => going_to === 3 ? ['-', 'F', 'L'].includes(grid[r][c]) : true) //left
      }
    }
  }

  return [p1!, p2!] as [number[], number[]];
}

const coord = (arr: number[]) => arr.slice(0, 2).join('_')
const moveToDir = (p: number[], to: number) => [p[0] + dir[to][0], p[1] + dir[to][1], to];

function part1() {
  let [p1, p2] = getInitial(grid, 'S');
  let count = 1;

  while (coord(p1) !== coord(p2)) {
    let [p1r, p1c, p1dir] = p1;
    let [p2r, p2c, p2dir] = p2;

    p1 = moveToDir(p1, dirMap.get(grid[p1r][p1c] + p1dir)!)
    p2 = moveToDir(p2, dirMap.get(grid[p2r][p2c] + p2dir)!)

    count++;
  }

  return count;
}

console.log("Day 10 - Part 1:", part1());

function part2() {

  return 0;
}

console.log("Day 10 - Part 2:", part2());