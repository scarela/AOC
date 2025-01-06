import { file, resolveSync } from "bun";

const data = (await file(resolveSync("./input", import.meta.dir)).text()).trim();
// const data = (await file(resolveSync("./input.test", import.meta.dir)).text()).trim();

function expandUniverse(universe_str: string) {
  const grid = universe_str.split('\n').map(l => [...l])
  const points: [number, number][] = [];
  const expandedRows: number[] = [];
  let expandedColumns: number[] = Array(grid[0].length).fill(0);

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf('#') === -1) {
      expandedRows.push(i);
    }

    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') {
        expandedColumns[j]++;
        points.push([i, j]);
      }
    }
  }

  expandedColumns = expandedColumns.map((x, i) => !x ? i : NaN).filter(Boolean)

  return [points, expandedRows, expandedColumns] as const;
}

// https://en.wikipedia.org/wiki/Taxicab_geometry
const computeTaxyCabDistances = (
  points: [number, number][],
  exp_rows: number[],
  exp_col: number[],
  expansion: number,
) => {
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [row1, col1] = points[i];
      const [row2, col2] = points[j];
      let row_minmax = [row1, row2];
      let [cmin, cmax] = Math.min(col1, col2) === col1 ? [col1, col2] : [col2, col1];
      let in_row_range = countInRage(row_minmax, exp_rows) * (expansion - 1); // why do we need to -1 expansion? I think this is to account for 0 indexed array
      let in_col_range = countInRage([cmin, cmax], exp_col) * (expansion - 1);
      
      //add expansion calculation to each max
      result += Math.abs((in_row_range + row2) - row1) + Math.abs((in_col_range + cmax) - cmin);
    }
  }

  return result;
}

const countInRage = ([min, max]: number[], range: number[]) => {
  return range.filter(n => min < n && n < max).length
}

const [points, exp_rows, exp_col] = expandUniverse(data);

function part1() {
  return computeTaxyCabDistances(points, exp_rows, exp_col, 2);
}

console.log("Day 11 - Part 1:", part1()); //9274989

function part2() {
  return computeTaxyCabDistances(points, exp_rows, exp_col, 1e6);
}

console.log("Day 11 - Part 2:", part2()); //357134560737