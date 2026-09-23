import sys
from collections import Counter

def solve():
    s = sys.stdin.read().strip()
    if not s:
        print(-1)
        return
    cnt = Counter(s)
    for i, ch in enumerate(s):
        if cnt[ch] == 1:
            print(i)
            return
    print(-1)

solve()
