// 排序通用：检查数组，交换数组项
function checkArray (arr) {
  if (!arr) {
    return
  }
}
function swap (arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}
// 冒泡排序
function bubbleSort (arr) {
  // 每趟找到最大放最后
  let length = arr.length
  // 从length-1个开始(全部)* 
  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 插入排序
function insertSort (arr) {
  // 从每趟把当前值插入正确位置
  for (let i = 1; i < length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // 比前一个小则交换
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 选择排序
function selectionSort (arr) {
  // 每趟找到最小项索引，直接放最前
  for (let i = 0; i < arr.length; i++) {
    let min_idx = i
    for (let j = i; j < arr.length; j++) {
      if (arr[min_idx] > arr[j]) {
        min_idx = j
      }
    }
    swap(arr, min_idx, i)
  }
}
// 归并排序

// 快速排序
function quickSort (arr) {
  length = arr.length
  // 递归到只有一个元素,此元素即为结果
  if (length < 2) {
    return arr
  }
  // 保存每次递归的较大、较小值
  let less = []
  let more = []
  // 将中位项的值作为tag
  let tag_idx = Math.floor(length / 2)
  let tag_val = arr[tag_indx]
  // 找到比tag小的值和大的值
  for (let i = 0; i < length; i++) {
    // 0629优化：没把arr[i]提出括号
    let cur_val = arr[i]
    if (cur_val < tag_val){
      less.push(cur_val)
    } else if ( cur_val > tag_val) {
      more.push(cur_val)
    }
  }
  // 递归的将小数组、tag、大数组拼接*
  return quickSort(less).concat([tag_val], quickSort(more))
}
// 斐波那契(递归+动态规划)

