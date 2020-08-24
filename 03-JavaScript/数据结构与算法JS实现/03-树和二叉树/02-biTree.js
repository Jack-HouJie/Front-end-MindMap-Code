// 树节点：链式存储结构
class TNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
  exec () {
    console.log(this.value);
  }
}
// 二叉树
class BiTree {
  constructor() {
    this.root = null
    this.size = 0
  }

  /** 深度优先遍历：先序（递归）
   * 
   * @param {*} node 
   */
  preOrder (node) {
    if (!node) {
      return
    }
    node.exec()
    // node.show();
    this.preOrder(node.left);
    this.preOrder(node.right);
  }
  /** 深度优先遍历：先序（非递归）
   * 指定开始节点先序遍历
   * 利用辅助栈：
   * 0.鲁棒性：如果指定开始节点不存在
   * 1.初始化：根节点入栈
   * 2.循环：栈空时结束
   *   2.1栈顶节点出栈访问
   *   2.2右孩子存在则入栈
   *   2.3左孩子存在则入栈
   * @param {TNode} root 
   */
  preTrav (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：根节点入栈
    let stack = []
    stack.push(node)
    // 2.循环：栈空时结束
    while (stack.length) {
      // 2.1栈顶节点出栈访问
      let node = stack.pop()
      node.exec()
      // 2.2右孩子存在则入栈
      if (node.right) {
        stack.push(node.right)
      }
      // 2.3左孩子存在则入栈
      if (node.left) {
        stack.push(node.left)
      }
    }
  }


  /** 深度优先遍历：中序 （递归）
   */
  middleOrder (node) {
    if (!node) {
      return
    }
    this.middleOrder(node.left);
    node.exec()
    this.middleOrder(node.right);
  }
  /** 深度优先遍历：中序 （非递归）
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
                如有右孩子：刚操作的节点作为第一个“中”，下次循环找到新的“左”
   * @param {TNode} root  
   */
  midTrav (root) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!root) {
      return 
    }
    // 1.初始化：构造辅助栈和当前结点node
    let stack = []
    let cur_node = root
    // 2.循环：待遍历树无节点 或 栈空 时结束
    while (cur_node || stack.length) {
      // 2.1 当前节点及其左子树依次入栈
      if (cur_node) {
        // 2.1.1当前节点入栈
        stack.push(cur_node)
        // 2.1.2当前节点变为其左孩子
        cur_node = cur_node.left
      }
      // 2.2 找到分支尽头后
      else {
        // 2.2.1 栈顶元素出栈访问
        cur_node = stack.pop()
        cur_node.exec()
        // 2.2.2 当前节点变为其右孩子
        cur_node = cur_node.right
      }
    }
  }


  /** 深度优先遍历：后序 （递归）
   *  后序遍历当前树
   */
  backOrder (node) {
    if (!node) {
      return
    }
    this.backOrder(node.left);
    this.backOrder(node.right);
    // node.show();
    node.exec()
  }
  /** 深度优先遍历：后序 
   *  指定开始节点后序遍历（非递归）
   * 
   * 思路：逆先序遍历，结果再逆序
   * @param {TNode} root  
   */
  backTrav (root) {
    // 0.如果指定开始节点不存在
    if (!root) {
      return
    }
    // 1.初始化：根节点入栈
    let stack = []
    stack.push(root)
    // 1.5 用于逆序的数组
    let arr = []
    // 2.循环：栈空时结束
    while (stack.length) {
      // 2.1 栈顶节点出栈逆序存储
      let node = stack.pop()
      arr.unshift(node)

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
    stack.forEach(element => {
      element.exec()
    })
  }

  /** 广度优先遍历
   * 从当前节点开始广度遍历
   * 
   * @param {TNode} cur_node  
   */
  breTravesal (cur_node) {
    if (!cur_node) {
      return false
    }
    // 1.初始化:当前节点入队
    let queue = []
    queue.push(cur_node)
    // 2.循环:队空时结束
    while (queue.length) {
      // 2.1当前节点出队访问
      let node = queue.shift()
      // console.log(node.value) // 可替换访问操作
      node.exec()
      // 2.2 左孩子存在则入队
      if (node.left) {
        queue.push(node.left)
      }
      // 2.2 右孩子存在则入队
      if (node.righ) {
        queue.push(node.right)
      }
    }
  }

}

// 二叉排序树
class BiSerchTree extends BiTree {
  constructor(node) {
    super()
    this.root = node
  }
  /** 插入节点
   * @param {*} data 
   */
  insert (data) {
    let node = new TNode(data)
    if (!this.root) {
      this.root = node
      this.size++
      return
    }
    let curNode = this.root
    let parent = null
    while (curNode) {
      parent = curNode
      if (data < parent.data) {
        curNode = curNode.left
        if (!curNode) {
          parent.left = node
          this.size++
          return
        }
      } else {
        curNode = curNode.right
        if (!curNode) {
          parent.right = node
          this.size++
          return
        }
      }
    }
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

