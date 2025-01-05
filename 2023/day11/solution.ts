import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = (await file(resolveSync("./input.test", import.meta.dir)).text()).trim();

function expandUniverse(universe_str: string, expantion: number) {
  const grid = universe_str.split('\n').map(l => [...l])
  let colIndex = 0;
  let rowIndex = 0;

  while (rowIndex < grid.length) {
    if (grid[rowIndex].indexOf('#') < 0) {
      grid.splice(rowIndex, 0, [...grid[rowIndex]]);
      rowIndex++;
    }
    rowIndex++;
  }

  while (colIndex < grid[0].length) {
    const set = new Set();

    grid.forEach(row => set.add(row[colIndex]));

    if (!set.has('#')) {
      for (let row of grid.keys()) grid[row].splice(colIndex, 0, '.');
      colIndex++;
    }
    colIndex++;
  }

  return grid
}

const getPoits = (grid: string[][]) => {
  return grid.reduce(
    (acc: [number, number][], l, row) => {
      for (let col of l.keys()) {
        if (l[col] === '#') acc.push([row, col]);
      }
      return acc;
    }, []);
}

const computeTaxyCabDistances = (points: number[][]) => {
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      result += Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }
  }

  return result;
}

function part1() {
  const grid = expandUniverse(data, 2);
  const points = getPoits(grid);

  return computeTaxyCabDistances(points);
}

console.log("Day 11 - Part 1:", part1());

function part2() {

  return 0;
}

console.log("Day 11 - Part 2:", part2());

