class TNode {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
  print () {
    console.log(this.value);
  }
  exec () {
    console.log(this.value);
  }
}
class BiTree {
  constructor(node) {
    this.root = node
    this.size = 1
  }
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
  /** 得到节点深度
   * @param {TNode} node 起始节点
   * @param {Number} deep 起始节点深度 
   */
  getDeep (node, deep) {
    if (node == null) {
      return deep
    }
    deep++
    let dleft = this.getDeep(node.left, deep)
    let dright = this.getDeep(node.right, deep)
    return Math.max(dleft, dright)
  }
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
                  如有右孩子：刚操作的节点作为第一个“中”，下次循环找到新的“左”
     */
  midOrderNR (node) {
    // 0.鲁棒性：如果指定开始节点不存在
    if (!node) {
      return
    }
    // 1.初始化：构造辅助栈、当前结点node
    let stack = []
    let curNode = node
    // 2.循环：待遍历树无节点 或 栈空 时结束
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
    // 2.循环：栈空时结束
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
    // 2.循环:队空时结束
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
console.log(tree.getDeep(tree.root, 0));