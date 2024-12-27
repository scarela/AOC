import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();
// const data = await file(resolveSync("./input.test", import.meta.dir)).text();
const lines = data.split('\n');
const height = lines.length;
const width = lines[0].split('').length;
const antennas = lines.reduce((acc: { [key: string]: number[][] }, l, i) => {
  for (const match of l.matchAll(/(\d|\w)/g)) {
    if (!acc[match[0]]) acc[match[0]] = [];
    acc[match[0]].push([i, match.index]);
  }
  return acc;
}, {});

const checkLimits = (r: number, c: number) => c >= 0 && r >= 0 && r < height && c < width;

function part1() {
  const result = new Set();

  for (const antenna in antennas) {
    for (let i = 0; i < antennas[antenna].length - 1; i++) {
      for (let j = i + 1; j < antennas[antenna].length; j++) {
        const [a1, a2] = [antennas[antenna][i], antennas[antenna][j]];
        const [a1row, a1col] = a1;
        const [a2row, a2col] = a2;
        const [row, col] = [a2row - a1row, a2col - a1col];
        const antinode: [number, number][] = [
          [a1row - row, a1col - col],
          [a2row + row, a2col + col]
        ]

        antinode.filter(ant => checkLimits(...ant))
          .forEach(ant => {
            result.add(ant.join('_'))
            lines[ant[0]] = lines[ant[0]].split('').with(ant[1], '#').join('');
          })
      }
    }
  }

  return result.size;
}

console.log("Day 8 - Part 1:", part1());

function part2() {
  const result = new Set();

  for (const antenna in antennas) {
    for (let i = 0; i < antennas[antenna].length - 1; i++) {
      for (let j = i + 1; j < antennas[antenna].length; j++) {
        const [a1, a2] = [antennas[antenna][i], antennas[antenna][j]];
        const [a1row, a1col] = a1;
        const [a2row, a2col] = a2;
        const [row, col] = [a2row - a1row, a2col - a1col];
        const antinode = [];
        let resonance = 0;

        while (true) {
          let bothBeyond = 0;
          let abc: [number, number][] = [
            [a1row - (row * resonance), a1col - (col * resonance)],
            [a2row + (row * resonance), a2col + (col * resonance)]
          ];
          if (checkLimits(...abc[0])) antinode.push(abc[0]);
          else bothBeyond++;

          if (checkLimits(...abc[1])) antinode.push(abc[1]);
          else bothBeyond++;

          if (bothBeyond === 2) break;
          resonance++;
        }

        antinode
          .forEach(ant => {
            result.add(ant.join('_'))
            lines[ant[0]] = lines[ant[0]].split('').with(ant[1], '#').join('');
          })
      }
    }
  }

  return result.size;
}

console.log("Day 8 - Part 2:", part2());