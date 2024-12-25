import { file, resolveSync } from "bun";

const data = await file(resolveSync("./input", import.meta.dir)).text();

const [orderingRules, updateList] = (() => {
  let xyz = data.split("\n\n").map((sec) => sec.split("\n"));
  const ul = xyz[1].map((l) => l.split(","));
  const or = xyz[0]
    .map((l) => l.split("|"))
    .reduce((obj: { [key: string]: string[] }, rule: string[]) => {
      if (!obj[rule[0]]) obj[rule[0]] = [];
      obj[rule[0]].push(rule[1]);
      return obj;
    }, {});

  return [or, ul];
})();

const validateOrderingRules = (list: string[]) => {
  for (let i = 0; i < list.length; i++) {
    if (orderingRules[list[i]]) {
      for (const bOf of orderingRules[list[i]]) {
        const after = list.indexOf(bOf);
        if (after > -1 && after < i) {
          return { valid: false, after, bOf, i, li: list[i] };
        };
      }
    }
  }

  return { valid: true };
}

function part1() {
  let sum = 0;

  for (const list of updateList) {
    const { valid } = validateOrderingRules(list);

    if (valid) {
      let num = +list[Math.trunc(list.length / 2)];
      sum += num;
    }
  }

  return sum;
}

console.log("Day 5 - Part 1:", part1());

function part2() {
  let sum = 0;

  for (const list of updateList) {
    let { valid, ...rest } = validateOrderingRules(list);
    let tempList = list;

    if (!valid) {
      while (!valid) {
        tempList = tempList.with(rest.after ?? 0, rest.li ?? "").with(rest.i ?? 0, rest.bOf ?? "")
        let result = validateOrderingRules(tempList);
        valid = result.valid;
        rest = { ...result };
      }
      let num = +tempList[Math.trunc(list.length / 2)];
      sum += num;
    }
  }

  return sum;
}

console.log("Day 5 - Part 2:", part2());
