import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def solve():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    parts = [x.strip() for x in line.split(',') if x.strip()]
    if not parts or parts[0] == 'null':
        print("")
        return
    root = TreeNode(int(parts[0]))
    q = [root]
    idx = 1
    while q and idx < len(parts):
        node = q.pop(0)
        if idx < len(parts) and parts[idx] != 'null':
            node.left = TreeNode(int(parts[idx]))
            q.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != 'null':
            node.right = TreeNode(int(parts[idx]))
            q.append(node.right)
        idx += 1
    res = []
    def inorder(n):
        if not n: return
        inorder(n.left)
        res.append(str(n.val))
        inorder(n.right)
    inorder(root)
    print(",".join(res))

solve()
