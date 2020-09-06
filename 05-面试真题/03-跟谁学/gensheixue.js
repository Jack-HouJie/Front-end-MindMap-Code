/** 阶乘函数
 * 
 * @param {Number} n 
 */
function func1 (n) {
  if (n === 1) {
    return 1
  }
  let temp = func1(n - 1)
  return n * temp
}

// console.log(func1(3));


String.prototype.reverse = function () {
  return this.split('').reverse().join('')
}

// let a = '123456'
// console.log(a.reverse())

/** 打印0到end中5的倍数
 * 
 * @param {Number} end 
 */
function printQuintupling (end) {
  if (end < 5) {
    return null
  }
  let cur = 5
  while (cur <= end) {
    console.log(cur)
    cur += 5
  }
}

// printQuintupling(31)


/** 判断回文
 * 
 * @param {String} str 
 */
function isReverseStr (str) {
  if (!str.length) {
    return null
  }
  reverse = str.split('').reverse().join('')
  return str === reverse
}

/** 找到最长的回文段
 * 
 * @param {String} str 
 */
function findMaxReverse (str) {
  let length = str.length
  for (let i = length; i > 0; i--) {
    let start = 0
    let end = i
    while (end <= length) {
      let curStr = str.slice(start, end)
      if (isReverseStr(curStr)) {
        return curStr
      }
      start++
      end++
    }
  }
}
// console.log(findMaxReverse('xxxx123dd3321ssss'))

/** 冒泡排序
 * 
 * @param {Array} arr 
 */
function bubble (arr) {
  if (!Array.isArray(arr) || !arr.length) {
    throw new Error('not array!')
  }
  let length = arr.length
  for (let i = length; i > 0; i--) {
    for (let j = 1; j < i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }
}
let arr = [8, 94, 15, 88, 55, 76, 21, 39]
bubble(arr)
console.log(arr);