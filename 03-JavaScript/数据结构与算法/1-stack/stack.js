// 实现一个栈
class Stack {
  constructor() {
    this.stack = []
  }
  push (item) {
    this.stack.push(item)
  }
  pop () {
    this.stack.pop()
  }
  getCount () {
    return this.stack.length
  }
  peek () {
    return this.stack[this.getCount() - 1]
  }
  isEmpty () {
    return this.getCount() === 0
  }
}


// 栈应用：匹配有效括号问题
// https://leetcode-cn.com/problems/valid-parentheses/
// 验证有效函数
var isValid = function (s) {
  let map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3,
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    let n = map[s[i]]
    if (n < 0) {
      stack.push(s[i])
    } else {
      let last = stack.pop()
      if (map[last] != -n)
        return false
    }
  }
  return stack.length === 0 ? true : false
}

console.log(isValid("()([{}])([}])"))
