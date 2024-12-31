import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();
// const data = `AAAA
// BBCD
// BBCC
// EEEC`;
// const data = `OOOOO
// OXOXO
// OOOOO
// OXOXO
// OOOOO` //p1: 772;


function part1() {
  const grid = data.split('\n').map(l => [...l]);
  const height = grid.length;
  const width = grid[0].length;
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const visited = new Set();
  const map = new Map<string, { count: number, perimeter: number }>();

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (visited.has([r, c].join('_'))) continue;

      const letter = grid[r][c];
      const mapStr = letter + "_" + [r, c].join("-");
      let perimeter = 0;
      let count = 0;
      map.set(mapStr, {
        count: 0,
        perimeter: 0
      });
      visited.add([r, c].join("_"))

      //BFS
      const queue = [[r, c]];

      while (queue.length) {
        count++;
        const [row, col] = queue.shift()!;

        for (const [rr, cc] of dir) {
          const [dr, dc] = [row + rr, col + cc];

          if (
            dr < height && dr >= 0 &&
            dc < width && dc >= 0 &&
            grid[dr][dc] === letter
          ) {
            if (!visited.has([dr, dc].join("_"))) {
              queue.push([dr, dc]);
              visited.add([dr, dc].join('_'))
            }
          } else
            perimeter++;
        }
      }
      map.get(mapStr)!.perimeter = perimeter;
      map.get(mapStr)!.count = count;
    }
  }

  return map.values().reduce((acc, { count, perimeter }) => acc + count * perimeter, 0);
}

const t0 = performance.now();
const p1 = part1();
const t1 = performance.now();
console.log("Day 12 - Part 1:", p1, `\nTook ${t1 - t0} milliseconds.\n`);

function part2() {
  const grid = new Map(
    data.split('\n')
      .flatMap((row, r) => [...row].map((char, c) => [(r << 16) | c, char]))
  )
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]].map(([r, c]) => (r << 16) + c);
  let result = 0;

  for (let [coord, char] of grid) {
    const plant = grid.get(coord);

    const area = new Set<number>([coord]);
    const queue = [coord];
    let corners = 0;
    let perimeter = 0;

    while (queue.length) {
      const c = queue.shift()!;
      
      dir.map((d, i) => {
        const nc = c + d;

        if (grid.get(nc) !== plant) {
          perimeter++;
          const next = (i + 1) % 4;

          if (grid.get(nc + dir[next]) === plant || grid.get(c + dir[next]) !== plant)
            corners++;
        }

        return nc;
      }).forEach(nc => {
        if (grid.get(nc) === plant && !area.has(nc) && area.add(nc))
          queue.push(nc)
      })
    }

    [...area].forEach(c => grid.delete(c));
    // console.log(char, area.size, corners)
    result += area.size * corners;
  }

  return result;
}

const t2 = performance.now();
const p2 = part2();
const t3 = performance.now();
console.log("Day 12 - Part 2:", p2, `\nTook ${t3 - t2} milliseconds.\n`);