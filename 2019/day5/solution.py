from pathlib import Path

file_path = Path(__file__).parent / 'input'
data = [int(x) for x in open(file_path).read().split(',')]


def get_value(arr: list[int], index: int, mode: int):
    if (mode == '0'):
        return arr[arr[index]]
    return arr[index]

# opcode 1


def add(arr: list[int], inst: str, index: int):
    arr[arr[index + 3]] = get_value(arr, index + 1,
                                    inst[2]) + get_value(arr, index + 2, inst[1])

    return 4


# opcode 2
def mult(arr: list[int], inst: str, index: int):
    arr[arr[index + 3]] = get_value(arr, index + 1,
                                    inst[2]) * get_value(arr, index + 2, inst[1])

    return 4


# opcode 3
def set(arr: list[int], inst: str, index: int, input: int):
    pos = arr[index + 1] if inst[2] == '0' else index + 1
    arr[pos] = input
    return 2

# opcode 4


def get(arr: list[int], inst: str, index: int):
    return (index + 2, get_value(arr, index+1, inst[2]))

# opcode 5


def jump_if_true(arr: list[int], inst: str, index: int):
    param1 = get_value(arr, index + 1, inst[2])
    param2 = get_value(arr, index + 2, inst[1])
    return param2 if param1 != 0 else index + 3


# opcode 6


def jump_if_false(arr: list[int], inst: str, index: int):
    param1 = get_value(arr, index + 1, inst[2])
    param2 = get_value(arr, index + 2, inst[1])
    return param2 if param1 == 0 else index + 3

# opcode 7


def less_than(arr: list[int], inst: str, index: int):
    param1 = get_value(arr, index + 1, inst[2])
    param2 = get_value(arr, index + 2, inst[1])
    arr[arr[index + 3]] = 1 if param1 < param2 else 0
    return 4

# opcode 8


def equals(arr: list[int], inst: str, index: int):
    param1 = get_value(arr, index + 1, inst[2])
    param2 = get_value(arr, index + 2, inst[1])
    arr[arr[index + 3]] = 1 if param1 == param2 else 0
    return 4


def part1(arr):
    index = 0
    input = 1
    printed_val = None

    while (arr[index] != 99):
        inst = str(arr[index]).zfill(5)

        if (inst[-1] == '1'):
            index += add(arr, inst, index)
        if (inst[-1] == '2'):
            index += mult(arr, inst, index)
        if (inst[-1] == '3'):
            index += set(arr, inst, index, input)
        if (inst[-1] == '4'):
            index, printed_val = get(arr, inst, index)

    return printed_val


print("Day 5 - part 1:", part1(data.copy()))


def part2(arr, val):
    index = 0
    input = val
    printed_val = None

    while (arr[index] != 99):
        inst = str(arr[index]).zfill(5)

        if (inst[-1] == '1'):
            index += add(arr, inst, index)
        elif (inst[-1] == '2'):
            index += mult(arr, inst, index)
        elif (inst[-1] == '3'):
            index += set(arr, inst, index, input)
        elif (inst[-1] == '4'):
            index, printed_val = get(arr, inst, index)
        elif (inst[-1] == '5'):
            index = jump_if_true(arr, inst, index)
        elif (inst[-1] == '6'):
            index = jump_if_false(arr, inst, index)
        elif (inst[-1] == '7'):
            index += less_than(arr, inst, index)
        elif (inst[-1] == '8'):
            index += equals(arr, inst, index)
        else:
            index += 1

    return printed_val


print("Day 5 - part 2:", part2(data.copy(), 5))

# test_data = [int(x) for x in "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99".split(',')]
# assert part2(test_data.copy(), 7) == 999
# assert part2(test_data.copy(), 8) == 1000
# assert part2(test_data.copy(), 9) == 1001
# print('Passed assertions')