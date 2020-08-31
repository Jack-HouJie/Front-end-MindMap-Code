

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