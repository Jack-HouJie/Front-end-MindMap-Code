// 数组展开
let arr = [1, [2, 3, [4]], "a", "b", ["c", "d"], [["d"], "e"], "f"];
arr.toString().split(',')

// 数组去重
// 利用filter
function unique (arr) {
  return arr.filter(function (item, index, arr) {
    // 只在当前元素第一次出现时为真
    return arr.indexOf(item, 0) === index
  })
}
