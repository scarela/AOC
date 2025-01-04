
from pathlib import Path

# Get the path to the sibling file
file_path = Path(__file__).parent / 'input'

with open(file_path) as file:
    modMassList = file.readlines()


def part1(input):
    return sum(int(mass) // 3 - 2 for mass in input)


print("Day 1 - part 1: ", part1(modMassList))


def part2(input):
    result = 0

    for modmass in input:
        sum = 0
        x = int(modmass) // 3 - 2
        while x >= 0:
            sum += x
            x = x // 3 - 2
        result += sum

    return result


print("Day 1 - part 2: ", part2(modMassList))
