import { dayWrapper, useData } from "../common.js";

const testData = `Time:      7  15   30
Distance:  9  40  200
`;

const { data } = useData(testData);

dayWrapper(() => {
    const [raceTime, recordDistance] = data.split('\n').map(line => +line.replace(/\D/g, ''));
    let start, end;

    for (let i = 1; i <= raceTime; i++) {
        if (i * (raceTime - i) > recordDistance) {
            start = i;
            end = raceTime - i;
            break;
        };
    }

    return end - start + 1;
}, "Day 6 - part 2")