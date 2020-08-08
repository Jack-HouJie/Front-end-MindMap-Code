// 栈应用：匹配有效括号
function valid (arr) {
  let map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2
  }
  let stack = []
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i]
    while (cur) {
      if (map[cur] < 0) {
        stack.push(map[cur])
      } else {
        let top = stack.pop()
        if (map[top] + map[cur] !== 0) {
          return false
        }
      }
    }
  }
  // 判断结果是否为空*
  return arr.lenght ? false : true
}
// 实现链表
class List {
  constructor() {
    this.pre_head = new Node(null)
    this.size = 0
  }
  addNode (node, index) {
    let pre = this.findIndex(index)
    node.next = pre.next
    pre.next = node
    // 更新size*
    this.size++
  }
  rmNode (node, index) {
    let pre = this.findIndex(index)
    pre.next = node.next
    node.next = null
    // 更新size*
    this.size--
  }
  findIndex (index) {
    this.checkIndex(index)
    let cur = pre_head
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    return cur
  }
  checkIndex (index) {
    // 0629错误：没考虑index<0
    if (index > this.size || index < 0) {
      throw 'index越界'
    }
  }
}
// 顺序打印链表
function printList (list) {
  for (let i = 0; i < list.size; i++) {
    console.log(list.findIndex(i))
  }
}
// 反转链表
function reverseList (head) {
  let pre = null
  let cur = head
  let after = null
  while (cur) {
    // after 保存下个节点
    after = cur.next
    // 反转：当前节点指向
    cur.next = pre
    // pre 后移一节点*
    pre = cur
    // cur 后移一节点
    cur = after
  }
}

// 建立二叉搜索树
class BST1 {
  constructor() {
    this.size = 0
    this.root = null
  }
  // 使用内部增节点函数，传入根节点和值*
  // 添加节点
  addNode (value) {
    return this._addNode(this.root, value)
  }
  _addNode (cur_node, value) {
    // 当前节点不存在时
    if (!cur_node) {
      // 更新大小*
      this.size++
      // 根据值创建一个节点并返回*
      return new TNode(value)
    } else {
      // 如果当前节点值大
      if (cur_node.value > value) {
        // 递归得到新节点，放在左边
        cur_node.left = _addNode(cur_node.left, value)
      } else {
        // 递归得到新节点，放在右边
        cur_node.right = _addNode(cur_node.right, value)
      }
    }
  }
  // 判断深度*
  maxDepth () {
    return _maxDepth(this.root)
  }
  _maxDepth (cur_node) {
    // 如果当前节点不存在(叶节点的子节点)
    if (!cur_node) {
      // 返回，不贡献层数
      return 0
    }
    // 递归的选择更深的子树，递归没深入一层贡献+1
    return Math.max(_maxDepth(cur_node.left), _maxDepth(cur_node.right)) + 1
  }
  // DFS(前序递归、中后类似)
  preTrav () {
    return this._preTrav(this.root)
  }
  _preTrav (cur_node) {
    // 递归的关键:条件终止*
    if (cur_node) {
      console.log(cur_node.value)
      this._preTrav(cur_node.left)
      this._preTrav(cur_node.right)
    }
  }

  // DFS(前中非递归)
  pre () {
    return this._preTrav(this.root)
  }
  _pre (cur_node) {
    // 根节点不存在则返回
    if (!cue_node) {
      return
    }
    // 初始化：根节点入栈
    let stack = []
    stack.push(cur_node)
    // 栈内有元素时
    while (stack.length) {
      // 栈顶出栈打印
      let top = stack.pop()
      console.log(top.value)
      // 右孩子入栈
      if (top.right) {
        stack.push(top.right)
      }
      // 左孩子入栈
      if (top.left) {
        stack.push(top.left)
      }
    }
  }
  mid () {
    return this._mid(this.root)
  }
  _mid (cur_node) {
    // 根节点不存在时返回
    if (!cur_node) {
      return
    }
    let stack = []
    // 栈内有元素 或者 当前元素存在时
    while (cur_node || stack.length) {
      // 1.当前节点存在时
      if (cur_node) {
        // 2.当前节点及其左子树依次入栈
        stack.push(cur_node)
        cur_node = cur_node.left
      } else {
        // 3.当前节点不存在时
        // 4.栈顶出栈打印
        cur_node = stack.pop()
        console.log(cur_node)
        // 5.当前节点切换至右孩子
        cur_node = cur_node.right
      }
    }
  }
  // BFS
  bfs () {
    return _bfs(this.root)
  }
  _bfs (cur_node) {
    if (!cur_node) {
      return
    }
    // 通过队列*
    let queue = []
    // 初始化根节点入队
    queue.push(cur_node)
    // 队列有元素时
    while (queue.length) {
      // 出队打印
      let first = queue.shift()
      console.log(first)
      // 左右孩子依次入队
      if (first.left) {
        stack.push(left)
      }
      if (first.right) {
        stack.push(right)
      }
    }
  }
}
// 排序通用：检查数组，交换数组项
function checkArray (arr) {
  if (!arr) {
    return
  }
}
function swap (arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}
// 冒泡排序
function bubbleSort (arr) {
  // 每趟找到最大放最后
  let length = arr.length
  // 从length-1个开始(全部)* 
  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 插入排序
function insertSort (arr) {
  // 从每趟把当前值插入正确位置
  for (let i = 1; i < length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // 比前一个小则交换
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 选择排序
function selectionSort (arr) {
  // 每趟找到最小项索引，直接放最前
  for (let i = 0; i < arr.length; i++) {
    let min_idx = i
    for (let j = i; j < arr.length; j++) {
      if (arr[min_idx] > arr[j]) {
        min_idx = j
      }
    }
    swap(arr, min_idx, i)
  }
}
// 归并排序

// 快速排序
function quickSort (arr) {
  length = arr.length
  // 递归到只有一个元素,此元素即为结果
  if (length < 2) {
    return arr
  }
  // 保存每次递归的较大、较小值
  let less = []
  let more = []
  // 将中位项的值作为tag
  let tag_idx = Math.floor(length / 2)
  let tag_val = arr[tag_indx]
  // 找到比tag小的值和大的值
  for (let i = 0; i < length; i++) {
    // 0629优化：没把arr[i]提出括号
    let cur_val = arr[i]
    if (cur_val < tag_val){
      less.push(cur_val)
    } else if ( cur_val > tag_val) {
      more.push(cur_val)
    }
  }
  // 递归的将小数组、tag、大数组拼接*
  return quickSort(less).concat([tag_val], quickSort(more))
}
// 斐波那契(递归+动态规划)

