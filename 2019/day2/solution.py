# https://adventofcode.com/2019/day/2
from pathlib import Path

# Get the path to the sibling file
file_path = Path(__file__).parent / 'input'

with open(file_path) as file:
    data = [int(x) for x in file.read().split(',')]


def program(input):
    for i in range(0, len(input)-1, 4):
        opcode = input[i]
        idx1 = input[i+1]
        idx2 = input[i+2]
        position = input[i+3]

        if opcode == 1:  # Sum
            input[position] = input[idx1] + input[idx2]
        elif opcode == 2:  # Mult
            input[position] = input[idx1] * input[idx2]
        elif opcode == 99:  # Halt
            break

    return input[0]  # return only the first value of the set


def part1(input):
    arr = input.copy()
    arr[1] = 12
    arr[2] = 2
    return program(arr)


def part2(input, num):
    for noun in range(100):
        for verb in range(100):
            arr = input.copy()
            arr[1] = noun
            arr[2] = verb
            if program(arr) == num:
                return [noun, verb]


print("Day 2 - part 1: ", part1(data))
print("Day 2 - part 2: ", part2(data, 19690720))
