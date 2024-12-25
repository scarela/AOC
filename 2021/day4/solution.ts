import { file, resolveSync } from "bun";

// const data = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`; //p1: 4512 (33348), p2: 1924
const data = await file(resolveSync("./input", import.meta.dir)).text();
const randNumbers =
  data
    .split("\n")[0]
    .match(/\d+/g)
    ?.map((n) => n) ?? [];
const boards = data
  .split("\n\n")
  .slice(1)
  .map((g) => g.split("\n").map((r) => r.match(/\d+/g)?.map((n) => n) ?? []));

const columnSelector = (boards: number, column: number) =>
  `board${boards}_col${column}`;
const rowSelector = (grid: number, row: number) =>
  `board${grid}_row${row}`;

function part1() {
  let unmarkedSum = boards.map((b) =>
    b.flat().reduce((acc: number, n) => acc + +(n ?? 0), 0),
  );
  let winningBoard = 0;
  let index = 0;
  let board_match_count = {} as any;
  let col = "";
  let row = "";

  main_loop: while (index < randNumbers.length) {
    board_loop: for (let i = 0; i < boards.length; i++) {
      //board
      for (let j = 0; j < boards[i].length; j++) {
        //row
        for (let k = 0; k < boards[i][j].length; k++) {
          //col
          if (randNumbers[index] === boards[i][j][k]) {
            unmarkedSum[i] -= +randNumbers[index];
            row = rowSelector(i, j);
            col = columnSelector(i, k);
            board_match_count[col] = (board_match_count[col] ?? 0) + 1;
            board_match_count[row] = (board_match_count[row] ?? 0) + 1;
            if (board_match_count[col] > 4 || board_match_count[row] > 4) {
              winningBoard = i;
              break main_loop;
            }
            continue board_loop; //go to next grid
          }
        }
      }
    }
    index++;
  }

  return unmarkedSum[winningBoard] * +randNumbers[index];
}

console.log("Day 4 - Part 1:", part1());

function part2() {
  let unmarkedSum = boards.map((b) =>
    b.flat().reduce((acc: number, n) => acc + +(n ?? 0), 0),
  );
  let index = 0;
  const board_match_count = {} as any;
  let col = "";
  let row = "";
  let lastWinningBoardIndex = 0;

  main_loop: while (index < randNumbers.length) {
    board_loop: for (let i = 0; i < boards.length; i++) {
      //board
      if (!boards[i]) continue;
      for (let j = 0; j < boards[i].length; j++) {
        //row
        for (let k = 0; k < boards[i][j].length; k++) {
          //col
          if (randNumbers[index] === boards[i][j][k]) {
            unmarkedSum[i] += -randNumbers[index];
            row = rowSelector(i, j);
            col = columnSelector(i, k);
            board_match_count[col] = (board_match_count[col] ?? 0) + 1;
            board_match_count[row] = (board_match_count[row] ?? 0) + 1;
            if (board_match_count[col] > 4 || board_match_count[row] > 4) {
              boards[i] = undefined as any;
              lastWinningBoardIndex = i;
              if (boards.every((b) => !b)) break main_loop;
              unmarkedSum[i] = undefined as any;
            }
            continue board_loop; //go to next board
          }
        }
      }
    }
    index++;
  }

  return unmarkedSum[lastWinningBoardIndex] * +randNumbers[index];
}

console.log("Day 4 - Part 2:", part2());