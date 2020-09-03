/** 构建大顶堆（小顶堆类似）
 * @param {*} arr 待调整二叉树（存储结构：数组）
 */
function createMaxHeap (arr) {
  let length = arr.length
  // 从第一个非叶子节点开始逐层向上
  // 遍历每层的元素进行下沉操作
  for (let i = Math.floor(length >> 1) - 1; i >= 0; i--) {
    createMaxHeapCore(arr, i, length)
  }
}
/** 构建大顶堆核心函数
 * 某一子树实现大顶
 * @param {*} arr 待调整二叉树（存储结构：数组）
 * @param {*} index 当前要调整子树的根节点
 * @param {*} length 数组长度（节点总数）
 */
function createMaxHeapCore (arr, index, length) {
  // 逐层深入处理
  for (let i = (index << 1) + 1; i < length; i = (i << 1) + 1) {
    // i取每层的最大值索引
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i++
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]]
      index = i
    } else {
      // 本层有序则本子树不要调整
      break
    }
  }
}

/** 大顶堆的插入
 * 
 * @param {Array} array 
 * @param {Number} value 
 */
function maxHeapAdd (arr, value) {
  if (arr.length === 0) {
    return [value]
  }
  let length = arr.length
  arr[length] = value
  let parentIdx = Math.floor(length >> 1)
  if (arr[(parentIdx << 1) + 1] !== value) {
    parentIdx--
  }
  // 逐层向上找到合适位置
  while (arr[parentIdx] < value) {
    createMaxHeapCore(arr, parentIdx, arr.length)
    parentIdx = Math.floor(length >> 1)
    if (arr[(parentIdx << 1) + 1] !== value) {
      parentIdx--
    }
  }
  return arr
}

/** 大顶堆删除（弹出最大值）
 * 
 * @param {Array} arr 
 */
function maxHeapPop (arr) {
  if (!arr.length) {
    return null
  }
  let maxVal = arr[0]
  arr[0] = arr[arr.length - 1]
  arr.length--
  createMaxHeapCore(arr, 0, arr.length)
  return maxVal
}


let arr = [3, 2, 1]
maxHeapAdd(arr, 4)
console.log(arr)
console.log(maxHeapPop(arr));
console.log(arr);
console.log(maxHeapPop(arr));
console.log(arr);