import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();

function part1() {
  const trailheads: Record<string, number> = {};
  const grid = data.split('\n').map(l => l.split(''));
  const [height, width] = [grid.length, grid[0].length];
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  for (let r = 0; r < width; r++) {
    for (let c = 0; c < height; c++) {
      if (grid[r][c] === '9') {
        const pathSet = new Set();

        // BFS
        let queue = [[r, c]];

        while (queue.length) {
          const [row, col] = queue.shift()!;

          if (grid[row][col] === '0') {
            const str = [row, col].join('_');
            trailheads[str] = (trailheads[str] ?? 0) + 1;
          } else {
            dir.map(d => [d[0] + row, d[1] + col])
              .filter(d => d[0] < height && d[0] >= 0 && d[1] < width && d[1] >= 0)
              .filter(d => +grid[d[0]][d[1]] === (+grid[row][col] - 1))
              .filter(d => !pathSet.has(d.join('_')))
              .forEach(d => {
                queue.push(d);
                pathSet.add(d.join('_'))
              });
          }
        }
      }
    }
  }

  return Object.values(trailheads).reduce((acc, h) => acc + h, 0);
}

console.log("Day 10 - Part 1:", part1());

function part2() {
  const trailheads: Record<string, number> = {};
  const grid = data.split('\n').map(l => l.split(''));
  const [height, width] = [grid.length, grid[0].length];
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  const dfs = ([r, c]: number[], root: number[]) => {
    if (grid[r][c] === '9') {
      trailheads[root.join("_")] = (trailheads[root.join("_")] ?? 0) + 1;
      return;
    }

    dir
      .map(d => [r + d[0], c + d[1]])
      .filter(d => d[0] < height && d[0] >= 0 && d[1] < width && d[1] >= 0)
      .filter(d => +grid[d[0]][d[1]] === (+grid[r][c] + 1))
      .forEach(d => dfs(d, root));

  }

  for (let r = 0; r < width; r++) {
    for (let c = 0; c < height; c++) {
      if (grid[r][c] === '0') {
        dfs([r, c], [r, c]);
      }
    }
  }

  return Object.values(trailheads).reduce((acc, h) => acc + h, 0);
}

console.log("Day 10 - Part 2:", part2());