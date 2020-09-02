let arr = [1, 3, 5, 7, 2, 4, 6, 8]
/** 顺序查找
 * 查找指定值，返回索引，失败返回null
 * @param {Array} arr 
 * @param {*} val 
 */
function sequentialSearch (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      return i
    }
  }
  return null
}

/** 二维数组查找
 * 
 * @param {*} target 
 * @param {Array} arr
 */
function find (target, arr) {
  // 找到左下角坐标
  let i = arr.length - 1
  let j = 0
  return findCore(target, arr, i, j)
}
function findCore (val, arr, i, j) {
  while (i >= 0 && j <= arr.length - 1) {
    if (arr[i][j] > val) {
      i--
    }
    else if (arr[i][j] < val) {
      j++
    }
    else {
      return i + ',' + j
    }
  }
  return null
}