/* 栈实现 */
class MyStack {
  constructor() {
    this.stack = []
    this.min = []
  }
  /**
   * 入栈
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
  /**
   * 出栈
   */
  pop () {
    this.stack.pop()
    this.min.pop()
  }
  /**
   * 得到长度
   */
  getCount () {
    return this.stack.length
  }
  /**
   * 查看栈顶元素
   */
  peek () {
    return this.stack[this.getCount() - 1]
  }
  /**
   * 判空
   */
  isEmpty () {
    return this.getCount() === 0
  }
  /**
   * 返回最小元素值
   */
  getMin () {
    return this.min[this.min.length - 1]
  }
}

let stack = new MyStack()
// stack.push(5)
// stack.push(3)
// stack.push(4)
// console.log(stack.getMin());


/* 栈应用 */

/**
 * 算术表达式问题：匹配有效括号
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

/**
 * 算术表达式问题：计算表达式
 * @param {String} str
 */


/**
 * 算术表达式问题：转换表达式
 * @param {String} str
 */

/**
 * 数制转换
 * @param {String} str
 */


/**
 * 递归算法
 */