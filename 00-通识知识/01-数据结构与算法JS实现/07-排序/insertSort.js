/**
 * 辅助函数
 * @param {Array} array 
 */
function checkArray (array) {
  if (!array) {
    throw 'array不存在'
  }
}
function swap (array, left, right) {
  let temp = array[right]
  array[right] = array[left]
  array[left] = temp
}



console.log(insertSort([1, 2, 3, 5, 4]));