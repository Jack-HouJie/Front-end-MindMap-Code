/* 栈实现 */
class MyStack {
  constructor() {
    this.stack = []
    this.min = []
  }
  /** 入栈
   * 
   * @param {*}} item 
   */
  push (item) {
    this.stack.push(item)
    if (!this.min[0]) {
      this.min[0] = item
    }
    else {
      let cur_min = this.min[this.min.length - 1]
      cur_min = item < cur_min ? item : cur_min
      this.min.push(cur_min)
    }
  }
  /** 出栈
   * 
   */
  pop () {
    this.stack.pop()
    this.min.pop()
  }
  /** 得到长度
   * 
   */
  getCount () {
    return this.stack.length
  }
  /** 查看栈顶元素
   * 
   */
  peek () {
    return this.stack[this.getCount() - 1]
  }
  /** 判空
   * 
   */
  isEmpty () {
    return this.getCount() === 0
  }
  /** 返回最小元素值
   * 
   */
  getMin () {
    return this.min[this.min.length - 1]
  }
}

// 两个队列实现一个栈
class MyStack1 {
  constructor() {
    this.queue1 = []
    this.queue2 = []
  }
  /** 入栈
   * @param {*}} item 
   */
  push (item) {
    if (queue1.length === 0) {
      this.queue1.push(item)
      while (this.queue2.length) {
        this.queue1.push(this.queue2.shift())
      }
    }
    else if (queue1.length === 0) {
      this.queue2.push(item)
      while (this.queue1.length) {
        this.queue2.push(this.queue1.shift())
      }
    }
  }
  /** 出栈
   * 
   */
  pop () {
    if (queue1.length > 0) {
      return this.queue1.shift()
    }
    else if (queue2.length > 0) {
      return this.queue2.shift()
    }
  }
}

let stack = new MyStack()
// stack.push(5)
// stack.push(3)
// stack.push(4)
// console.log(stack.getMin());


/* 栈应用 */

/**算术表达式问题：匹配有效括号
 * 
 * https://leetcode-cn.com/problems/valid-parentheses/
 * 验证有效函数
 * @param {String} str 
 */
function isValid (str) {
  let map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3,
  }
  let stack = []
  for (let i = 0; i < str.length; i++) {
    let n = map[str[i]]
    // 如果是左括号
    if (n < 0) {
      stack.push(str[i]) // 入栈
    }
    // 如果是右括号 
    else {
      let last = stack.pop() // 栈顶出栈
      // 如果不匹配
      if (map[last] != -n)
        return false
    }
  }
  // 恰好全部匹配时为true
  return stack.length === 0 ? true : false
}
// console.log(isValid("()([{}])([}])"))

/** 栈的压入弹出序列
 * 输入两个整数序列，第一个序列表示栈的压入顺序，
 * 请判断第二个序列是否可能为该栈的弹出顺序。
 * @param {Array} pushV 入栈序列
 * @param {Array} popV 出栈序列
 */
function IsPopOrder (pushV, popV) {
  if (!pushV || !popV || pushV.length !== popV.length) {
    throw new Error('length error!')
  }
  let stack = []
  let index = 0
  for (let i = 0; i < pushV.length; i++) {
    stack.push(pushV[i])
    while (stack.lenght && stack[stack.length - 1] === popV[index]) {
      stack.pop()
      index++
    }
  }
  return stack.length === 0
}
