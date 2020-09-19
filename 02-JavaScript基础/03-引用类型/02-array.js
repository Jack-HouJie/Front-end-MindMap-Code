let arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

/* 转换方法 */
// console.log(arr.join("^"))

/* 操作方法 */

// // 截取
// console.log(arr.slice(0, -2))

// // 剪接
// console.log(arr.splice(0, 3, 123, 456))
// console.log(arr)

// // 填充
// console.log(arr.fill(9))
// console.log(arr)

// 排序
// console.log(arr.sort())

/* 迭代归并 */
// // 迭代判断
// let result = arr.every(function (item, index, array) {
//   return index < 5
// })
// let result1 = arr.some(function (item, index, array) {
//   return index < 5
// })
// console.log(result)
// console.log(result1)

// // 迭代筛选
// let result2 = arr.filter(function (item, index, array) {
//   return index < 3
// })
// console.log(result2);

// // 迭代操作，无返回
// let result3 = arr.forEach(function (item, index, array) {
//   // console.log(item)
//   item += 1
// })
// console.log(result3)
// console.log(arr)

// // 迭代操作，返回新数组副本
// let result4 = arr.map(function (item, index, array) {
//   // console.log(item);
//   return index + 1
// })
// console.log(result4);
// console.log(arr);

// // 归并操作
// let arr1 = [1, 2, 3, 4, 5]
// let result5 = arr1.reduce(function (preItem, curItem, curIndex, arr) {
//   return preItem + curItem
// }, 100)
// console.log(result5);
// console.log(arr1);

/* 遍历数组 */
// for (let index in arr) {
//   console.log(arr[index]);
// }

/* 应用 */
// 数组去重
function unique (arr) {
  return arr.filter(function (item, index, arr) {
    // 只在当前元素第一次出现时为真
    return arr.indexOf(item, 0) === index
  })
}
// console.log(unique(arr));


// 快速的让一个数组乱序
// let arr = [1, 2, 3, 4, 5]
// function randomArr (arr) {
//   arr.sort(function () {
//     return Math.random() - 0.5
//   })

// }
// randomArr(arr)
// console.log(arr)


// let arr = [1, 1, [2, 3, [4]], "a", "b", ["c", "d"], "f", [["d"], "e"]]
/** 数组扁平化/数组展开/数组降维
 * @param {Array} arr 
 */
function flatten (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('not array')
  }
  //  toString() 方法返回一个表示该对象的字符串
  return arr.toString().split(',')
}
// let result = flatten(arr)