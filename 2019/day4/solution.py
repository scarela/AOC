# https://adventofcode.com/2019/day/4

# Previous implementation (only working for p2):
# sum = 0

# for passw in range(246540,787419+1):
#     digits = str(passw)
#     #Tue if it has a pair and is not part of trio
#     pair = any([(i == 0 or digits[i]!= digits[i-1]) and digits[i] == digits[i+1] and (i == len(digits)-2 or digits[i] != digits[i+2]) for i in range(len(digits)-1)])
#     #True if the number decreases
#     decre = any([digits[i] > digits[i+1] for i in range(len(digits)-1)])
#     if pair and not decre:
#         sum += 1

import collections
from pathlib import Path
file_path = Path(__file__).parent / 'input'

with open(file_path) as f:
    start, stop = map(int, f.read().split('-'))

# Solution 2


def matcher(pwd, group_criteria_fn):
    if len(pwd) != 6 or any(pwd[i] > pwd[i+1] for i in range(5)):
        return False
    groups = [pwd.count(c) for c in pwd]
    return any(group_criteria_fn(group) for group in groups)


# part1 = sum(matcher(str(pwd), lambda x: x >= 2) for pwd in range(start, stop))
# print(part1)

# part2 = sum(matcher(str(pwd), lambda x: x == 2) for pwd in range(start, stop))
# print(part2)


# Solution 3
def increasing(x): return x == ''.join(sorted(x))
def double(x): return 2 in collections.Counter(x).values()
def double_or_more(x): return any(
    count >= 2 for count in collections.Counter(x).values())


def valid_p1(x): return increasing(x) and double_or_more(x)
def valid_p2(x): return increasing(x) and double(x)


part1 = sum(1 for pwd in range(start, stop) if valid_p1(str(pwd)))
print(part1)
part2 = sum(1 for pwd in range(start, stop) if valid_p2(str(pwd)))
print(part2)
