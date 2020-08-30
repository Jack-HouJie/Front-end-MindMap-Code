/** 辅助函数
 * 检查数组是否存在
 * @param {Array} array 
 */
function checkArray (array) {
  if (!Array.isArray(array)) {
    throw new Error('数据非数组')
  }
  if (!array) {
    throw new Error('数组不存在')
  }
}
/** 辅助函数
 * 交换数组指定索引元素
 * @param {Array} array 
 * @param {Number} left 
 * @param {Number} right 
 */
function swap (array, left, right) {
  let temp = array[right]
  array[right] = array[left]
  array[left] = temp
}

/** 冒泡排序
 * 
 * @param {Array} arr 
 */
function bubbleSort (arr) {
  // 鲁棒性*
  checkArray(arr)
  let length = arr.length
  // 最后一项的索引是length-1*
  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// console.log(bubbleSort('[1, 3, 4, 2, 5]'))

/** 快速排序*
 * 
 * @param {Array} arr 
 */
function quickSort (arr) {
  let length = arr.length
  if (length == 0) {
    return []
  }
  let midIdx = Math.floor(length >> 1)
  let midVal = arr.splice(midIdx, 1)
  let leftArr = []
  let rightArr = []
  for (let i = 0; i < length - 1; i++) {
    let curVal = arr[i]
    if (curVal < midVal) {
      leftArr.push(curVal)
    }
    else {
      rightArr.push(curVal)
    }
  }
  return quickSort(leftArr).concat(midVal, quickSort(rightArr))
}
console.log(quickSort([3, 1, 4, 6, 5, 7, 2]))