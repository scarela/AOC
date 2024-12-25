import { file, resolveSync } from "bun";

// const data = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`; //p1: 198, p2: 230
const data = await file(resolveSync("./input", import.meta.dir)).text();
const diagnosticReports = data.split("\n");

function part1() {
  const freq: number[] = [];
  let binary = "";
  let invertedBinary = "";

  for (const report of diagnosticReports) {
    report.split("").forEach((bit, i) => {
      freq[i] = (bit === "0" ? -1 : 1) + (freq[i] ?? 0);
    });
  }

  binary = freq.map((n) => (n >= 0 ? "1" : "0")).join("");
  invertedBinary = binary
    .split("")
    .map((b) => 1 - +b)
    .join("");
  return parseInt(binary, 2) * parseInt(invertedBinary, 2);
}

console.log("Day 3 - Part 1:", part1());

function part2() {
  let OxygenGeneratorRating = parseInt(findFreq(diagnosticReports, 0)[0], 2);
  let CO2ScrubberRatting = parseInt(
    findFreq(diagnosticReports, 0, "less")[0],
    2,
  );

  function findFreq(
    bitArr: string[],
    index: number,
    freq: "most" | "less" = "most",
  ) {
    if (bitArr.length < 2) return bitArr;

    let count = {
      0: 0,
      1: 0,
    } as any;
    let freqBit = "";

    bitArr.forEach((bitStr) => count[bitStr[index]]++);

    freqBit = count["0"] > count["1"] ? "0" : "1";

    if (freq === "less") freqBit = freqBit === "0" ? "1" : "0";

    if (bitArr.length % 2 === 0 && count["0"] === count["1"])
      freqBit = freq === "most" ? "1" : "0";

    const filtered = bitArr.filter((bitStr) => bitStr[index] === freqBit);
    return findFreq(filtered, index + 1, freq);
  }

  return OxygenGeneratorRating * CO2ScrubberRatting;
}

console.log("Day 3 - Part 2:", part2());
