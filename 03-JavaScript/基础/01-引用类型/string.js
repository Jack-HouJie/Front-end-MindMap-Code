/* 应用 */
// // 数组展开
// let arr = [1, 1, [2, 3, [4]], "a", "b", ["c", "d"], "f", [["d"], "e"]];
// console.log(arr.toString().split(','))

// // 判断回文
// function valid (str) {
//   if (typeof str !== 'string') {
//     return false
//   }
//   return str.split('').reverse().join('') === str
// }
// console.log(valid("1abcba"))
// 处理查询字符串
// const q_str = location.search
const q_str = 'name=zhangsan&age=14&school=s1&school=s2&student'
function getQueryString () {
  // 判断是否存在*，通过BOM得到查询字符串*
  // const q_str = location.search.length > 0 ? location.search.slice(1) : ''
  const items = q_str.length > 0 ? q_str.split('&') : []
  const length = items.length
  let map = {}
  for (let i = 0; i < length; i++) {
    // 每项是一个数组*
    let item = items[i].split('=')
    // 进行URI解码
    let name = decodeURIComponent(item[0])
    if (item[1]) {
      let value = decodeURIComponent(item[1])
      if (map[name]) {
        // 第二次后变为数组
        map[name] = [].concat(map[name], `${value}`)
      } else {
        map[name] = value
      }
    } else {
      map[name] = true
    }
  }
  console.log(map)
  return map
}
getQueryString()
