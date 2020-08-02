class TNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// 建立二叉搜索树
class BST {
  constructor() {
    this.root = null
    this.size = 0
  }
  // 添加节点
  addNode (v) {
    return node = this._addNode(this.root, v)
  }
  _addNode (cur_node, value) {
    if (!cur_node) {
      this.size++
      return new TNode(value)
    } else {
      if (value < cur_node.value) {
        cur_node.left = this._addNode(cur_node.left, value)
      } else {
        cur_node.right = this._addNode(cur_node.right, value)
      }
    }
  }
  maxDepth(){
    return this._maxDepth(this.root)
  }
  // 确定深度
  _maxDepth (node) {
    // 当前节点不存在时
    if (!node) {
      // 返回0（不贡献深度）
      return 0
    }
    // 递归每深入一层就贡献+1深度
    return Math.max(_maxDepth(node.left), _maxDepth(node.right)) + 1
  }

  /* 深度优先遍历 */
  // 先序遍历（递归）
  preTravesal () {
    return this._preTravesal(this.root)
  }
  _preTravesal (cur_node) {
    if (cur_node) {
      console.log(cur_node)
      this._preTravesal(cur_node.left)
      this._preTravesal(cur_node.right)
    }
  }
  // 先序遍历（非递归）
  preTrav (root) {
    if (!root) {
      return
    }
    // 初始化：根节点入栈
    let stack = []
    stack.push(root)
    // 当栈内有元素时
    while (stack.length) {
      // 栈顶节点出栈打印
      let node = stack.pop()
      console.log(node.value)
      // 其子节点先右后左入栈
      if (node.right) {
        stack.push(node.right)
      }
      if (node.left) {
        stack.push(node.left)
      }
    }
  }

  // 中序遍历(递归)
  midTravesal () {
    return this._midTravesal(this.root)
  }
  _midTravesal (cur_node) {
    if (cur_node) {
      this._midTravesal(cur_node.left)
      console.log(cur_node)
      this._midTravesal(cur_node.right)
    }
  }
  // 中序遍历（非递归）
  midTrav (root) {
    if (!root) {
      return false
    }
    let stack = []
    let node = root
    // 当前节点存在或栈不空时
    while (node || stack.length) {
      // 如当前节点存在（还可能有左孩子）
      if (node) {
        // 当前节点入栈
        stack.push(node)
        // 当前节点变为其左孩子
        node = node.left
        // 效果：当前节点及其左子树依次入栈
      }
      // 如当前节点不存在(找到左节点：栈顶元素)
      else {
        // 栈顶元素出栈打印
        node = stack.pop()
        console.log(node)
        // 当前节点变为其右孩子(不一定有)
        node = node.right
      }
    }
  }
  // 后序遍历
  backTravesal () {
    return this._backTravesal(this.root)
  }
  _backTravesal (cur_node) {
    if (cur_node) {
      this._backTravesal(cur_node.left)
      this._backTravesal(cur_node.right)
      console.log(cur_node)
    }
  }
  // 后序遍历（非递归）
  backTrav (root) {

  }

  /* 广度优先遍历 */
  breTravesal () {
    this._breTravesal(this.root)
  }
  _breTravesal (cur_node) {
    if (!cur_node) {
      return false
    } else {
      let queue = []
      queue.push(cur_node)
    }
    while (queue.length) {
      // 当前节点出队
      let node = queue.shift()
      console.log(node.value)
      // 其左右孩子分别入队
      if (node.left) {
        queue.push(node.left)
      }
      if (node.righ) {
        queue.push(node.right)
      }
    }
  }


}


