import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();

const robots = data.split('\n').map(l => l.match(/-?\d+/g)?.map(Number) ?? [])

function part1(w: number, h: number, s: number) {
  const width = w;
  const heigth = h;
  const seconds = s;
  const heigth_middle = Math.trunc(heigth / 2)
  const width_middle = Math.trunc(width / 2)
  const quadrant = Array(4).fill(0);

  for (const [rx, ry, vx, vy] of robots) {
    let dx = (rx + vx * seconds) % width;
    let dy = (ry + vy * seconds) % heigth;

    if (dx < 0) dx += width
    if (dy < 0) dy += heigth

    if (dx === width_middle || dy === heigth_middle) continue

    if (dx < width_middle) {
      if (dy < heigth_middle)
        quadrant[0] += 1
      else
        quadrant[2] += 1
    } else {
      if (dy < heigth_middle)
        quadrant[1] += 1
      else
        quadrant[3] += 1
    }
  }


  return quadrant.reduce((acc, n) => acc * n, 1)
}

// console.log("Day 14 - Part 1:", part1(11, 7, 100)); //test data
console.log("Day 14 - Part 1:", part1(101, 103, 100));

function part2() {

  return 0;
}

console.log("Day 14 - Part 2:", part2());

