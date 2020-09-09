/**判断字符串是否表示数值
 * 
 * @param {String} str 
 */
function isNumeric (str) {
  if (!str) {
    return false
  }
  let pointCount = 0
  let eCount = 0
  let eTag = false
  for (let i = 0; i < str.length; i++) {
    // 只能出现数字、符号位、小数点、指数位
    let regAll = /[0-9eE.+-]/
    if (!regAll.test(str[i])) {
      return false
    }
    // 小数点，指数符号不能出现在开头结尾
    if (i == 0 || i == str.length - 1) {
      let regEe = /[eE.]/
      if (regEe.test(str[i])) {
        return false
      }
    }
    // 统计 eE. 次数
    // 指数位出现后，小数点不允许在出现
    if (str[i] == '.') {
      pointCount++
      if (eTag) {
        return false
      }
    } else if (str[i] == 'e' || str[i] == 'E') {
      eCount++
      eTag = true
    }
    // 符号位只能出现在开头和指数位后面
    if (str[i] == '+' || str[i] == '-') {
      if (i != 0 && str[i - 1] != "e" && str[i - 1] != "E") {
        return false
      }
    }
  }
  // 小数点，指数符号只能出现一次
  if (pointCount > 1 || eCount > 1) {
    return false
  }
  return true
}
// let result = isNumeric("1+.21e3234")

/** 正则表达式（.*）匹配递归函数-困难
 * 
 * @param {String} str 字符串
 * @param {String} pattern 正则式
 * @param {Number} strIndex 字符串开始索引
 * @param {Number} patternIndex 正则式开始索引
 */
function matchStr (str, pattern, strIndex, patternIndex) {
  // 递归停止条件：
  // 如果为通用匹配
  if (patternIndex + 1 < pattern.length && pattern[patternIndex] == '.' && pattern[patternIndex + 1] == '*') {
    return true
  }
  // 如果恰好匹配（索引都超出范围）
  if (strIndex === str.length && patternIndex === pattern.length) {
    return true
  }
  // 如果字符串没匹配完
  if (strIndex !== str.length && patternIndex === pattern.length) {
    return false
  }
  // 如果存在下一个模式字符且是“*”
  if (patternIndex + 1 < pattern.length && pattern[patternIndex + 1] == "*") {
    // 如果当前字符匹配
    if (str[strIndex] === pattern[patternIndex]) {
      // 或逻辑：有一种情况满足就可以
      // 模式后移两个字符：*代表出现0次
      return matchStr(str, pattern, strIndex, patternIndex + 2) ||
        // 字符串后移1字符，模式后移2字符：*代表出现1次
        matchStr(str, pattern, strIndex + 1, patternIndex + 2) ||
        // 字符串后移1字符，模式不变: *代表出现多次
        matchStr(str, pattern, strIndex + 1, patternIndex)
    }
    // 如果当前字符不匹配
    else {
      // 模式后移两个字符：*代表出现0次
      return matchStr(str, pattern, strIndex, patternIndex + 2)
    }
  }
  // 如果字符串和模式都有剩余，且当前字符匹配成功
  if (strIndex !== str.length && patternIndex !== pattern.length && (str[strIndex] === pattern[patternIndex] || pattern[patternIndex] === '.')) {
    // 字符串和模式后移1个字符：继续匹配
    return matchStr(str, pattern, strIndex + 1, patternIndex + 1)
  }
  return false
}
// let result = matchStr("123", "1.*", 0, 0)

/** 字符串字符的所有排列***
 * @param {String} str 
 */
function Permutation (str) {
  const result = []
  if (str) {
    queue = str.split('')
    PermutationCore(queue, result)
  }
  // result.sort()
  return result
}
function PermutationCore (queue, result, temp = "", current = "") {
  current += temp // 排列当前字符
  // 如果待排队列为空
  if (queue.length === 0) {
    result.push(current) // 增加一种结果
    return
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift() // 出队作为新字符
    PermutationCore(queue, result, temp, current) // 待排队列中的元素依次加入
    queue.push(temp)
  }
}
// let result = Permutation("abc")

/** 左旋转字符串
 * 
 * @param {String} str 
 * @param {Number} n 旋转的个数
 */
function leftRotateString (str, n) {
  // 方法一
  // let left = str.slice(0, n)
  // let right = str.slice(n)
  // let left_arr = left.split("").reverse()
  // let right_arr = right.split("").reverse()
  // return left_arr.concat(right_arr).reverse().join("")
}
// let result = leftRotateString("abcde", 2)

/** 找到第一个非重复字符
 * 
 * @param {String} str 
 */
function firstUniqChar (str) {
  for (let char of new Set(str)) {
    if (str.match(new RegExp(char, 'g')).length === 1) {
      return char
    }
  }
  return ' '
}
let result = firstUniqChar('1231234455566')

console.log(result)