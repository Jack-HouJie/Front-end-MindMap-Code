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

/** 插入类排序 */
/** 直接插入排序
 * 将左侧序列看成增序序列，
 * 每次将一个数字插入该增序列。
 * @param {Array} array 
 */
function insertSort (array) {
  checkArray(array)
  let length = array.length
  // 从第二项开始，从前向后确定每一项的位置
  for (let i = 1; i < length; i++) {
    // 找到当前项位置：
    // 从当前项前一个位置开始，从后向前遍历
    for (let j = i - 1; j >= 0; j--) {
      // 如果前大后小
      if (array[j] > array[j + 1]) {
        // 则交换位置
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
/** 折半插入排序
 * 
 * @param {Array} array 
 */
/** 希尔排序
 * 
 * @param {Array} array 
 */

/** 交换类排序 */
/** 冒泡排序
 * 循环数组，如果前大后小则交换位置。
 * 每趟对未排序数 进行循环
 * @param {Array} array 
 */
function bubbleSort (array) {
  checkArray(array)
  let length = array.length
  // 每趟确定一个最大值
  // 从最后一项开始，从后往前遍历
  for (let i = length - 1; i > 0; i--) {
    // 趟内相邻比较交换
    // 从第一项到趟尾，从前往后遍历
    for (let j = 0; j < i; j++) {
      // 如果前大后小
      if (array[j] > array[j + 1]) {
        // 则交换位置
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
/** 快速排序*
 * 选择一个目标值，
 * 比目标值小的放左边，比目标值大的放右边，
 * 目标值的位置已排好，将左右两侧再进行快排。
 * @param {Array} array 
 */
function quickSort (arr) {
  let length = arr.length
  // 递归停止条件：待排序数组为空
  if (length == 0) {
    return []
  }
  // 取出参考值
  let midIdx = Math.floor(length >> 1)
  let midVal = arr.splice(midIdx, 1)
  // 较小、较大值数组
  let leftArr = []
  let rightArr = []
  // 找到较小、较大值
  for (let i = 0; i < length - 1; i++) {
    let curVal = arr[i]
    if (curVal < midVal) {
      leftArr.push(curVal)
    }
    else {
      rightArr.push(curVal)
    }
  }
  // 递归的拼接较小值数组、参考值、较大值数组
  return quickSort(leftArr).concat(midVal, quickSort(rightArr))
}

/** 选择类排序 */
/** 简单选择排序
 * 每次排序取一个最小的数字放到前面的增序序列中。
 * @param {Array} array 
 */
function selectionSort (array) {
  checkArray(array)
  let length = array.length
  // 每趟选择最小值放最前
  for (let i = 0; i < length - 1; i++) {
    // 先把本趟第一个当作最小索引
    let min_index = i
    // 从本趟第二个开始，找到最小索引
    for (let j = i + 1; j < length; j++) {
      min_index = array[min_index] < array[j] ? min_index : j
    }
    // 直接把最小项换至本趟开头
    swap(array, min_index, i)
  }
  return array
}
/** 堆排序
 * 创建一个大顶堆，大顶堆的堆顶一定是最大的元素。
 * 交换第一个元素和最后一个元素，
 * 让剩余的元素继续调整为大顶堆。
 * 从后往前以此和第一个元素交换并重新构建，排序完成。
 * @param {Array} array 
 */

/* 归并类排序 */
/** 二路归并排序
 * 将大序列二分成小序列，
 * 将小序列排序后再将排序后的小序列归并成大序列。
 * @param {Array} array 
 */
function mergeSort (array) {
  checkArray(array)
  mergeSortCore(array, 0, array.length - 1)
  return array
}
/** 归并排序核心
 * 
 * @param {Array} array 
 * @param {Number} left 
 * @param {Number} right 
 */
function mergeSortCore (array, left, right) {
  // 迭代停止条件：只剩一个待排序数
  if (left === right) {
    return
  }
  // 找到中间索引
  let mid = Math.floor(left + ((left + right) >> 1))
  // 递归的归并排序左右两边
  // 递：只剩两个数时，排序好两个数
  // 归：2、4、8、16······
  mergeSortCore(array, left, mid)
  mergeSortCore(array, mid + 1, right)
  // 临时存放已排序数
  let temp = []
  // 已排序数尾部索引
  let i = 0
  // 左侧头索引
  let j = left
  // 右侧头索引
  let k = mid + 1

  // 当左右两侧都有剩余数时
  while (j !== mid && k !== right) {
    // 左右两侧从前往右找到小值存入已排序数组
    temp[i++] = array[j] < array[k] ? array[j++] : array[k++]
  }
  // 如果右侧排完，左侧还有剩余
  while (j !== mid) {
    // 左侧顺序接入
    temp[i++] = array[j++]
  }
  // 如果左侧排完，右侧还有剩余
  while (k !== right) {
    // 右侧顺序接入
    temp[i++] = array[k++]
  }
  // 将排序好的数写回原数组
  let length = temp.length
  for (let i = 0; i < length; i++) {
    array[left + i] = temp[i]
  }
  return array
}