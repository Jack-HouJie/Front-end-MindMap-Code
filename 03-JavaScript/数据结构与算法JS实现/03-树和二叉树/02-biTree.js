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

  /** 添加节点：指定起始节点插入新节点
 * 
 * @param {TNode} cur_node 
 * @param {*} value 
 */
  _addNode (cur_node, value) {
    // 递归停止条件：找到该插入的位置
    // 如当前节点不存在
    if (!cur_node) {
      this.size++
      return new TNode(value)
    }
    else {
      // 递归的找到插入位置
      if (value < cur_node.value) {
        cur_node.left = this._addNode(cur_node.left, value)
      }
      else {
        cur_node.right = this._addNode(cur_node.right, value)
      }
    }
  }
  /** 添加节点
   * 
   * @param {*} val 
   */
  addNode (val) {
    return this._addNode(this.root, val)
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
    // 递归的计算高度
    // 每深入一层就贡献+1高度
    return Math.max(_maxHeight(node.left), _maxHeight(node.right)) + 1
  }
  /** 确定树深度
   * 
   */
  maxDepth () {
    return this._maxHeight(this.root) // 返回根节点高度
  }

  /* 深度优先遍历 */
  /** 指定开始节点先序遍历
   * 
   * @param {TNode} cur_node 
   */
  _preTravesal (cur_node) {
    // 递归停止条件：如果当前节点不存在
    if (!cur_node) {
      return
    }
    console.log(cur_node) // 可替换访问节点操作
    this._preTravesal(cur_node.left)
    this._preTravesal(cur_node.right)
  }
  /** 先序遍历当前树（递归）
   * 
   */
  preTravesal () {
    return this._preTravesal(this.root)
  }
  /** 指定开始节点先序遍历（非递归）
   * 利用辅助栈：
   * 0.鲁棒性：如果指定开始节点不存在
   * 1.初始化：根节点入栈
   * 2.循环：栈空时结束
   *   2.1栈顶节点出栈访问
   *   2.2右孩子存在则入栈
   *   2.3左孩子存在则入栈
   * @param {TNode} root 
   */
  preTrav (root) {
    // 0.鲁棒性：如果指定开始节点不存在
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

  /** 指定开始节点中序遍历
   * 
   * @param {TNode} cur_node 
   */
  _midTravesal (cur_node) {
    // 递归停止条件：如果当前节点不存在
    if (!cur_node) {
      return
    }
    this._midTravesal(cur_node.left)
    console.log(cur_node)
    this._midTravesal(cur_node.right)
  }
  /** 中序遍历当前树（递归）
   * 
   */
  midTravesal () {
    return this._midTravesal(this.root)
  }
  /** 指定开始节点中序遍历（非递归）
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
      return false
    }
    // 1.初始化：构造辅助栈和当前结点node
    let stack = []
    let cur_node = root
    // 2.循环：待遍历树无节点 且 栈空 时结束
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
        console.log(cur_node) // 可替换访问操作
        // 2.2.2 当前节点变为其右孩子
        cur_node = cur_node.right
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