let arr = [1, 1, [2, 3, [4]], "a", "b", ["c", "d"], "f", [["d"], "e"]]
/** 数组扁平化/数组展开
 * @param {Array} arr 
 */
function flatten (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('not array')
  }
  //  toString() 方法返回一个表示该对象的字符串
  return arr.toString().split(',')
}
let result = flatten(arr)

// 判断回文
function valid (str) {
  if (typeof str !== 'string') {
    return false
  }
  return str.split('').reverse().join('') === str
}
// console.log(valid("1abcba"))

/** 替换空格*
 * 
 * @param {String} str 
 */
function replaceSpace (str) {
  return str.split(" ").join("")
}
// let result = replaceSpace("   123123  12 3123  ")

/** 反转单词顺序
 * 
 * @param {String} str 
 */
function reverseSentence (str) {
  return str.split(" ").reverse().join(" ")
}
// console.log(reverseSentence("hello world!"));

/** 求字符串占字节数
 * 
 * @param {String} str 
 */
function GetBytes (str) {
  let length = str.length
  let bytes = length
  for (let i = 0; i < length; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++
    }
  }
  return bytes
}
// let result = GetBytes('12啊3123')

console.log(result)