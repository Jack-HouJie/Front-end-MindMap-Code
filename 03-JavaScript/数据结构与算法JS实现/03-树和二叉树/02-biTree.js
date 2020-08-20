// 链式存储结构树节点
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
  /** 添加节点
   * 
   * @param {*} val 
   */
  addNode (val) {
    return this._addNode(this.root, val)
  }
  /** 添加节点：指定起始节点插入新节点
   * 
   * @param {TNode} cur_node 
   * @param {*} value 
   */
  _addNode (cur_node, value) {
    // 如当前节点不存在
    if (!cur_node) {
      this.size++
      return new TNode(value)
    }
    else {
      if (value < cur_node.value) {
        cur_node.left = this._addNode(cur_node.left, value)
      }
      else {
        cur_node.right = this._addNode(cur_node.right, value)
      }
    }
  }

  /** 确定树深度
   * 
   */
  maxDepth () {
    return this._maxHeight(this.root) // 返回根节点高度
  }
  /** 计算指定节点高度
   * 
   * @param {TNode} node 
   */
  _maxHeight (node) {
    // 当前节点不存在时
    if (!node) {
      // 返回0（不贡献高度）
      return 0
    }
    // 递归每深入一层就贡献+1高度
    return Math.max(_maxHeight(node.left), _maxHeight(node.right)) + 1
  }

  /* 深度优先遍历 */
  /** 先序遍历当前树（递归）
   * 
   */
  preTravesal () {
    return this._preTravesal(this.root)
  }
  /** 指定开始节点先序遍历
   * 
   * @param {TNode} cur_node 
   */
  _preTravesal (cur_node) {
    // 如果当前节点存在（递归的返回条件）
    if (cur_node) {
      console.log(cur_node) // 可替换访问节点操作
      this._preTravesal(cur_node.left)
      this._preTravesal(cur_node.right)
    }
  }
  /** 指定开始节点先序遍历（非递归）
   * 
   * @param {TNode} root 
   */
  preTrav (root) {
    // 0.如果指定开始节点不存在
    if (!root) {
      return
    }
    // 1.初始化：根节点入栈
    let stack = []
    stack.push(root)
    // 2.循环：栈空时结束
    while (stack.length) {
      // 2.1栈顶节点出栈访问
      let node = stack.pop()
      console.log(node.value) // 可替换访问操作

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

  /** 中序遍历当前树（递归）
   * 
   */
  midTravesal () {
    return this._midTravesal(this.root)
  }
  /** 指定开始节点中序遍历
   * 
   * @param {TNode} cur_node 
   */
  _midTravesal (cur_node) {
    if (cur_node) {
      this._midTravesal(cur_node.left)
      console.log(cur_node)
      this._midTravesal(cur_node.right)
    }
  }
  /** 指定开始节点中序遍历（非递归）
   * 
   * @param {TNode} root 
   */
  midTrav (root) {
    if (!root) {
      return false
    }
    let stack = []
    let node = root
    // 循环：栈空且待遍历树无节点时结束
    while (node || stack.length) {
      // 如当前树节点存在（还可能有左孩子）
      if (node) {
        // 当前节点入栈
        stack.push(node)
        // 当前节点变为其左孩子
        node = node.left
        // 效果：当前节点及其左子树依次入栈（找到“左”）
      }
      // 如当前节点不存在(栈顶元素即为第一个左节点)
      else {
        // 栈顶元素出栈访问
        node = stack.pop()
        console.log(node) // 可替换访问操作
        // 当前节点变为其右孩子(不一定有)
        node = node.right
      }
    }
  }

  /** 后序遍历当前树（递归）
   * 
   */
  backTravesal () {
    return this._backTravesal(this.root)
  }
  /** 指定开始节点后序遍历
   * 
   * @param {TNode} cur_node 
   */
  _backTravesal (cur_node) {
    if (cur_node) {
      this._backTravesal(cur_node.left)
      this._backTravesal(cur_node.right)
      console.log(cur_node)
    }
  }
  /** 指定开始节点后序遍历（非递归）
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
    array.forEach(element => {
      console.log(element) // 可替换访问操作
    })
  }

  /* 广度优先遍历 */
  breTravesal () {
    this._breTravesal(this.root)
  }
  /** 从当前节点开始广度遍历
   * 
   * @param {TNode} cur_node 
   */
  _breTravesal (cur_node) {
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
      console.log(node.value) // 可替换访问操作
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

/** 二叉树遍历 */


/** 二叉树的对称性 */


/** 二叉搜索树 */


/** 二叉树的深度 */