import { dayWrapper, useData } from "../common.js";

const testData = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const { data } = useData(testData);

dayWrapper(() => {
    let current = 'AAA';
    let count = 0;

    const [dir, letters] = data.split('\n\n');
    const directions = dir.split('');
    const dict = letters.split('\n')
        .filter(l => !!l)
        .reduce((acc, line) => {
            const [label, L, R] = [...line.match(/\w+/g)];
            return acc.set(label, { L, R });
        }, new Map())

    while (current !== 'ZZZ') {
        const next_dir = directions[count % directions.length];

        current = dict.get(current)[next_dir];
        count++;
    }

    return count;
}, "Day 8 - part 1")