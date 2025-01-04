# https://adventofcode.com/2019/day/2
from pathlib import Path

# Get the path to the sibling file
file_path = Path(__file__).parent / 'input'

A, B = [x.split(',') for x in open(file_path).readlines()]

DX = {'L': -1, 'R': 1, 'U': 0, 'D': 0}
DY = {'L': 0, 'R': 0, 'U': 1, 'D': -1}


def get_points(A):
    x = 0
    y = 0
    length = 0
    ans = {}
    for cmd in A:
        d = cmd[0]
        n = int(cmd[1:])
        for _ in range(n):
            x += DX[d]
            y += DY[d]
            length += 1
            if (x, y) not in ans:
                ans[(x, y)] = length
    return ans


PA = get_points(A)
PB = get_points(B)
Union = set(PA.keys()) & set(PB.keys())
part1 = min(abs(x)+abs(y) for (x, y) in Union)
part2 = min(PA[p]+PB[p] for p in Union)

print("Day 3 - part 1: ", part1)
print("Day 3 - part 2: ", part2)
