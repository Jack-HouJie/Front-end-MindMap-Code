/**判断字符串是否表示数值
 * 
 * @param {String} str 
 */
function isNumeric (str) {
  if (!str) {
    return false
  }
  let point_count = 0
  let e_count = 0
  let e_tag = false
  for (let i = 0; i < str.length; i++) {
    // 只能出现数字、符号位、小数点、指数位
    let reg_all = /[0-9eE.+-]/
    if (!reg_all.test(str[i])) {
      return false
    }
    // 小数点，指数符号不能出现在开头结尾
    if (i == 0 || i == str.length - 1) {
      let reg_eE = /[eE.]/
      if (reg_eE.test(str[i])) {
        return false
      }
    }
    // 统计 eE. 次数
    // 指数位出现后，小数点不允许在出现
    if (str[i] == '.') {
      point_count++
      if (e_tag) {
        return false
      }
    } else if (str[i] == 'e' || str[i] == 'E') {
      e_count++
      e_tag = true
    }
    // 符号位只能出现在开头和指数位后面
    if (str[i] == '+' || str[i] == '-') {
      if (i != 0 && str[i - 1] != "e" && str[i - 1] != "E") {
        return false
      }
    }
  }
  // 小数点，指数符号只能出现一次
  if (point_count > 1 || e_count > 1) {
    return false
  }
  return true
}
// let result = isNumeric("1+.21e3234")

/** 正则表达式（.*）匹配递归函数
 * 
 * @param {String} str 字符串
 * @param {String} pattern 正则式
 * @param {Number} str_index 字符串开始索引
 * @param {Number} pattern_index 正则式开始索引
 */
function matchStr (str, pattern, str_index, pattern_index) {
  // 递归停止条件：
  // 如果为通用匹配
  if (pattern_index + 1 < pattern.length && pattern[pattern_index] == '.' && pattern[pattern_index + 1] == '*') {
    return true
  }
  // 如果恰好匹配（索引都超出范围）
  if (str_index === str.length && pattern_index === pattern.length) {
    return true
  }
  // 如果字符串没匹配完
  if (str_index !== str.length && pattern_index === pattern.length) {
    return false
  }
  // 如果存在下一个模式字符且是“*”
  if (pattern_index + 1 < pattern.length && pattern[pattern_index + 1] == "*") {
    // 如果当前字符匹配
    if (str[str_index] === pattern[pattern_index]) {
      // 或逻辑：有一种情况满足就可以
      // 模式后移两个字符：*代表出现0次
      return matchStr(str, pattern, str_index, pattern_index + 2) ||
        // 字符串后移1字符，模式后移2字符：*代表出现1次
        matchStr(str, pattern, str_index + 1, pattern_index + 2) ||
        // 字符串后移1字符，模式不变: *代表出现多次
        matchStr(str, pattern, str_index + 1, pattern_index)
    }
    // 如果当前字符不匹配
    else {
      // 模式后移两个字符：*代表出现0次
      return matchStr(str, pattern, str_index, pattern_index + 2)
    }
  }
  // 如果字符串和模式都有剩余，且当前字符匹配成功
  if (str_index !== str.length && pattern_index !== pattern.length && (str[str_index] === pattern[pattern_index] || pattern[pattern_index] === '.')) {
    // 字符串和模式后移1个字符：继续匹配
    return matchStr(str, pattern, str_index + 1, pattern_index + 1)
  }
  return false
}
// let result = matchStr("123", "1.*", 0, 0)

/** 字符串字符的所有排列***
 * 
 * @param {String} str 
 */
function Permutation (str) {
  const result = [];
  if (str) {
    queue = str.split('')
    PermutationCore(queue, result);
  }
  // result.sort();
  return result
}
function PermutationCore (queue, result, temp = "", current = "") {
  current += temp; // 排列当前字符
  // 如果待排队列为空
  if (queue.length === 0) {
    // console.log("结果：temp:" + temp + ",current:" + current + ",queue:" + queue);
    result.push(current); // 增加一种结果
    return;
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift(); // 出队作为新字符
    // console.log("递：temp:" + temp + ",current:" + current + ",queue:" + queue);
    PermutationCore(queue, result, temp, current); // 待排队列中的元素依次加入
    queue.push(temp);
    // console.log("归：temp:" + temp + ",current:" + current + ",queue:" + queue);
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
let result = leftRotateString("abcde", 2)

console.log(result);