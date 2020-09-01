class TNode {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
  print () {
    console.log(this.value)
  }
  exec () {
    console.log(this.value)
  }
  save (arr) {
    arr.push(this.value)
    console.log(arr)
  }
}
class BiTree {
  constructor(node) {
    this.root = node
    this.size = 1
  }
  /* 二叉树遍历问题 */
  preOrder (node) {
    if (!node) {
      return null
    }
    node.exec()
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
  midOrder (node) {
    if (!node) {
      return null
    }
    this.midOrder(node.left)
    node.exec()
    this.midOrder(node.right)
  }
  /** 中序遍历树并保存
   * 
   * @param {TNode} node 开始遍历的节点
   * @param {Array} result 存储遍历结果的数组 
   */
  saveMidOrder (node, result) {
    if (!node) {
      return null
    }
    this.saveMidOrder(node.left)
    node.save(result)
    this.saveMidOrder(node.right)
  }
  backOrder (node) {
    if (!node) {
      return null
    }
    this.backOrder(node.left)
    this.backOrder(node.right)
    node.exec()
  }
  preOrderNR (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：构造辅助栈、根节点入栈
    let stack = []
    stack[0] = node
    // 2.循环：栈空时结束
    while (stack.length) {
      // 2.1栈顶节点出栈访问
      let curNode = stack.pop()
      curNode.exec()
      // 2.2右孩子存在则入栈
      if (curNode.right) {
        stack.push(curNode.right)
      }
      // 2.3左孩子存在则入栈
      if (curNode.left) {
        stack.push(curNode.left)
      }
    }
  }
  /** 深度优先遍历思路：中序 （非递归）
   *  指定开始节点中序遍历
   *  0.指定开始节点不存在则返回
   *  1.构造辅助栈和当前结点设为根
   *  2.循环：待遍历树无节点 且 栈空 时结束
   *    2.1 当前节点存在时的处理，效果：当前节点及其左子树依次入栈
   *      2.1.1当前节点入栈
   *      2.1.2当前节点变为其左孩子
   *    2.2 当前节点不存在时的处理，效果：找到分支尽头后开始处理“左”“中”“右”操作
   *      2.2.1 栈顶元素出栈访问
   *      2.2.2 当前节点变为其右孩子
   * 效果：
   *  0.鲁棒性
   *  1.初始化
   *  2.循环处理所有节点
   *    2.1 当前节点及其左子树依次入栈
   *      2.1.1 当前节点入栈
   *      2.1.2 如果有左子树，下一次循环其左子树入栈
   *            如果没有左子树，下一次循环进入2.2打印一个“左”
   *    2.2 找到分支尽头后开始处理“左”“中”“右”操作
   *      2.2.1 出栈访问的节点有可能是“左”“中”“右”
   *      2.2.2 如没有右孩子：刚操作的节点作为“左”，下次循环的操作“中”（栈顶元素）
   *            如有右孩子：刚操作的节点作为第一个“中”，下次循环找到新的“左”
   */
  midOrderNR (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：构造辅助栈、当前结点node
    let stack = []
    let curNode = node
    // 2.循环：待遍历树有节点 或 栈中有节点 时
    while (curNode || stack.length) {
      // 2.1 当前节点及其左子树依次入栈
      if (curNode) {
        // 2.1.1当前节点入栈
        stack.push(curNode)
        // 2.1.2当前节点变为其左孩子
        curNode = curNode.left
      }
      // 2.2 找到分支尽头后
      else {
        // 2.2.1 栈顶元素出栈访问
        curNode = stack.pop()
        curNode.exec()
        // 2.2.2 当前节点变为其右孩子
        curNode = curNode.right
      }
    }
  }
  backOrderNR (node) {
    // 0.如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：根节点入栈
    let stack = []
    stack.push(node)
    // 1.5 结果逆序数组
    let reverseArr = []
    // 2.循环：栈中有节点时时
    while (stack.length) {
      // 2.1 栈顶节点出栈存储
      let node = stack.pop()
      reverseArr.push(node)
      // 2.2 左孩子存在则入栈
      if (node.left) {
        stack.push(node.left)
      }
      // 2.3 右孩子存在则入栈
      if (node.right) {
        stack.push(node.right)
      }
    }
    // 3.打印逆序存储结果
    while (reverseArr.length) {
      let curNode = reverseArr.pop()
      curNode.exec()
    }
  }
  breTravesal (node) {
    if (!node) {
      return false
    }
    // 1.初始化:当前节点入队
    let queue = []
    queue.push(node)
    // 2.循环:队不空时
    while (queue.length) {
      // 2.1当前节点出队访问
      let curNode = queue.shift()
      curNode.exec()
      // 2.2 左孩子存在则入队
      if (curNode.left) {
        queue.push(curNode.left)
      }
      // 2.2 右孩子存在则入队
      if (curNode.right) {
        queue.push(curNode.right)
      }
    }
  }

  /* 二叉搜索树树问题 */
  /** 二叉搜索树插入节点
   * 
   * @param {TNode} node 
   * @param {*} value 
   */
  insert (node, value) {
    if (value < node.value) {
      if (node.left) {
        this.insert(node.left, value)
      }
      else {
        this.size++
        node.left = new TNode(value)
      }
    }
    if (value > node.value) {
      if (node.right) {
        this.insert(node.right, value)
      }
      else {
        this.size++
        node.right = new TNode(value)
      }
    }
  }
  /** 找到二叉搜索树第k小节点
   * @param {TNode} node
   * @param {Number} k 
   */
  getKthMin (node, k) {
    let result = []
    tree.saveMidOrder(node, result)
    console.log(result[k - 1]);
  }

  /* 二叉树深度问题 */
  /** 得到节点最大深度
   * @param {TNode} node 起始节点
   * @param {Number} deep 起始节点深度 
   */
  getDeepMax (pRoot) {
    if (!node) {
      return 0
    }
    let left = balance(node.left)
    let right = balance(node.right)
    return Math.max(left, right) + 1
  }
  /** 二叉树的最小深度
   * BFS变种：每次处理一层
   * @param {TNode} root 根节点
   */
  getDeepMin (root) {
    if (!root) {
      return 0
    }
    const queue = [root]
    let depth = 1
    while (queue.length) {
      const length = queue.length
      for (let i = 0; i < length; i++) {
        const cur = queue.shift()
        if (cur.left == null && cur.right == null) {
          return depth
        }
        if (cur.left) {
          queue.push(cur.left)
        }
        if (cur.right) {
          queue.push(cur.right)
        }
      }
      depth++ // 肯定有下一层，如果没有早就return了
    }
  }
  /** 判断平衡二叉树
   * http://www.conardli.top/docs/dataStructure/%E4%BA%8C%E5%8F%89%E6%A0%91/%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91.html
   * @param {TNode} pRoot 
   */
  isBalanced (pRoot) {
    return balance(pRoot) != -1
  }
  balance (node) {
    if (!node) {
      return 0
    }
    let left = balance(node.left)
    let right = balance(node.right)
    if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
      return -1
    }
    return Math.max(left, right) + 1
  }
}

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
/** 二叉树遍历问题：
 * 根据后序遍历判断是否是二叉搜索树
 * @param {Array} arr 
 */
function VerifySquenceOfBST (arr) {
  // 递归停止：
  if (!arr) {
    return true
  }
  let length = arr.length
  let mid = arr[length - 1]
  let i = 0
  while (arr[i] < mid) {
    i++
  }
  let j = i
  while (j < length) {
    if (arr[j] < mid) {
      return false
    }
    j++
  }
  let left = true
  if (i > 0) {
    left = VerifySquenceOfBST(arr.slice(0, i))
  }
  let right = true
  if (i < length - 1) {
    right = VerifySquenceOfBST(arr.slice(i, length - 1))
  }
  return left && right
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
 * 二叉树镜像
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


let tree = new BiTree(new TNode(10))

tree.insert(tree.root, 1)
tree.insert(tree.root, 100)
tree.insert(tree.root, 50)
tree.insert(tree.root, 105)
// tree.preOrder(tree.root)
// tree.midOrder(tree.root)
// tree.backOrder(tree.root)
// tree.preOrderNR(tree.root)
// tree.midOrderNR(tree.root)
// tree.backOrder(tree.root)
// tree.breTravesal(tree.root)

// console.log(tree.getDeep(tree.root, 0));

// tree.getKthMin(tree.root, 1)

console.log(VerifySquenceOfBST([3, 1, 2]))
