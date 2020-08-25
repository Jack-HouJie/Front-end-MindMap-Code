

// 二叉排序树
class BiSerchTree extends BiTree {
  constructor(node) {
    super()
    this.root = node
  }

  /** 返回树深度
   * 
   * @param {TNode} node 
   * @param {Number} deep 
   */
  getDeep (node, deep) {
    deep = deep || 0
    if (node == null) {
      return deep
    }
    deep++
    let dleft = this.getDeep(node.left, deep)
    let dright = this.getDeep(node.right, deep)
    return Math.max(dleft, dright)
  }

  /** 找到第k小节点
   * @param {Number} k 
   */
  kthNode (k) {
    let resultArr = []
    this.midTravesal(function (curNode) {
      resultArr.push(curNode.value)
    })
    return resultArr[k - 1]
  }

}


var t = new BiSerchTree();
t.insert(1);
t.insert(3);
t.insert(2);
t.insert(4);

// console.log(t);
// t.preOrder(t.root);
// t.middleOrder(t.root);
// t.backOrder(t.root);

// t.midTrav(t.root)
t.backTrav(t.root)


/** 二叉树遍历问题：
 * 已知前中遍历，重建二叉树
 * @param {String} pre "1,2,4,7,3,5,6,8"
 * @param {String} mid "4,7,2,1,5,3,8,6"
 */
function reConstructBinaryTree (pre, mid) {
  // 鲁棒性
  if (!pre) {
    return null
  }
  // 递归停止条件：
  // 先序遍历队列剩最后一个
  if (pre.length === 1) {
    return new TNode(pre[0])
  }
  let curValue = pre[0]
  let curIdx = mid.indexOf(curValue)
  let leftMid = pre.slice(0, curIdx)
  let rightMid = pre.slice(curIdx + 1)
  let lfetPre = pre.slice(1, curIdx + 1)
  let rightPre = pre.slice(curIdx + 1)
  let node = new TNode(curValue)
  node.left = reConstructBinaryTree(lfetPre, leftMid)
  node.right = reConstructBinaryTree(rightPre, rightMid)
  return node
}

/** 二叉树遍历问题：
 * 已知前中遍历，求后序遍
 * @param {String} pre 
 * @param {String} mid 
 */
function getHRD (pre, mid) {
  if (!pre) {
    return ""
  }
  if (pre.length === 1) {
    return pre[0]
  }
  let curNode = pre[0]
  let curIdx = mid.indexOf(curNode)
  let leftMid = mid.slice(0, curIdx)
  let rightMid = mid.slice(curIdx + 1)
  let leftPre = pre.slide(1, leftMid.length)
  let rightPre = pre.slice(leftMid.length)
  return getHRD(leftPre, leftMid) + getHRD(rightPre, rightMid) + curNode
}

/** 对称性问题：
 * 判断二叉树是否对称
 * @param {TNode} node1 
 * @param {TNode} node2 
 */
function isSymmetrical (pRoot) {
  if (!pRoot) {
    return false
  }
  return isSymmetricalTree(pRoot, pRoot);
}
function isSymmetricalTree (node1, node2) {
  if (!node1 && !node2) {
    return true
  }
  if (!node1 || !node2) {
    return false
  }
  if (node1.value !== node2.value) {
    return false
  }
  return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left)
}

/** 对称性问题：
 * 二叉树的镜像
 * @param {TNode} root 
 */
function mirror (root) {
  if (!root) {
    return null
  }
  let rightVal = root.right.value
  root.right.value = root.left.value
  root.left.value = rightVal
  mirror(root.left)
  mirror(root.right)
}

/** 二叉搜索树 */


/** 二叉树的深度 */

