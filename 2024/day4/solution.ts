import { file, resolveSync } from "bun";

// const data = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;
const data = await file(resolveSync("./input", import.meta.dir)).text();
const charGrid = data
  .split("\n")
  .filter((l) => l) //filter out empty lines
  .map((l) => l.split(""));

function part1(grid: string[][]) {
  const m = grid.length;
  const n = grid[0].length;
  let result = 0;

  const getHorizontal = (r: number, c: number, dir = 1) =>
    grid[r][c] +
    grid[r][c + 1 * dir] +
    grid[r][c + 2 * dir] +
    grid[r][c + 3 * dir];

  const getVertical = (r: number, c: number, dir = 1) =>
    grid[r][c] +
    grid[r + 1 * dir][c] +
    grid[r + 2 * dir][c] +
    grid[r + 3 * dir][c];

  const getDiagonal = (r: number, c: number, dirX = 1, dirY = 1) =>
    grid[r][c] +
    grid[r + 1 * dirY][c + 1 * dirX] +
    grid[r + 2 * dirY][c + 2 * dirX] +
    grid[r + 3 * dirY][c + 3 * dirX];

  const compare = (str: string) => str === "XMAS";

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (charGrid[r][c] === "X") {
        let lim = [0, 0, 0, 0];

        //check top dir
        if (r >= 3) {
          lim[0] = 1;
          result += +compare(getVertical(r, c, -1));
        }
        //check right dir
        if (c <= n - 4) {
          lim[1] = 1;
          result += +compare(getHorizontal(r, c));
        }
        //check down dir
        if (r <= m - 4) {
          lim[2] = 1;
          result += +compare(getVertical(r, c));
        }
        //check left dir
        if (c >= 3) {
          lim[3] = 1;
          result += +compare(getHorizontal(r, c, -1));
        }

        //check up-right dir
        if (lim[0] && lim[1]) {
          result += +compare(getDiagonal(r, c, 1, -1));
        }
        //check down-right dir
        if (lim[2] && lim[1]) {
          result += +compare(getDiagonal(r, c));
        }
        //check down-left dir
        if (lim[2] && lim[3]) {
          result += +compare(getDiagonal(r, c, -1));
        }
        //check up-left dir
        if (lim[0] && lim[3]) {
          result += +compare(getDiagonal(r, c, -1, -1));
        }
      }
    }
  }

  return result;
}

console.log("Day 4 - Part 1:", part1(charGrid));

function part2(grid: string[][]) {
  const m = grid.length;
  const n = grid[0].length;
  let result = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r >= 1 && r <= m - 2 && c >= 1 && c <= n - 2 && grid[r][c] === "A") {
        const posDiagonal = grid[r - 1][c - 1] + grid[r + 1][c + 1];
        const negDiagonal = grid[r + 1][c - 1] + grid[r - 1][c + 1];

        result += +(
          ["MS", "SM"].includes(posDiagonal) &&
          ["MS", "SM"].includes(negDiagonal)
        );
      }
    }
  }

  return result;
}

console.log("Day 4 - Part 2:", part2(charGrid));
