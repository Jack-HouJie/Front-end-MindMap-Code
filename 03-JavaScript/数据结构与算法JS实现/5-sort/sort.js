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

// 冒泡排序
function bubble (array) {
  checkArray(array)

  let length = array.length
  // 每趟找到最大放最后
  for (let i = length - 1; i > 0; i--) {
    // 在趟内把最大值交换到最后（相邻比较交换）
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return array
}

// 插入排序
function insertSort (array) {
  checkArray(array)

  length = array.length
  // 每趟把当前值插入正确位置
  for (let i = 1; i < length; i++) {
    // 比前一个小则交换
    for (let j = i - 1; j >= 0; j--) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

// 选择排序
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


// 归并排序
function Sort (array) {
  checkArray(array)
  mergeSort(array, 0, array.length - 1)
  return array
}
function mergeSort (array, left, right) {
  if (left === right) {
    return
  }
  let mid = parseInt(left + ((left + right) >> 1))
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)
  let temp = []
  let i = 0
  let j = left
  let k = mid + 1
  while (j !== mid && k !== right) {
    temp[i++] = array[j] < array[k] ? array[j++] : array[k++]
  }
  while (j !== mid) {
    temp[i++] = array[j++]
  }
  while (k !== right) {
    temp[i++] = array[k++]
  }
  let length = temp.length
  for (let i = 0; i < length; i++) {
    array[left + i] = temp[i]
  }
  return array
}

// 快速排序
function quickSort (array) {
  let length = array.length
  // 递归到只有一个元素,此元素即为结果
  if (length <= 1) {
    return array
  }
  // 保存每次递归的较大、较小值
  let less = []
  let more = []
  // 将中位项的值作为tag
  let tag_idx = Math.floor(length / 2)
  let tag_val = array[tag_idx]
  // 找到比tag小的值和大的值,加入对应数组
  for (let i = 0; i < length; i++) {
    let cur_val = array[i]
    if (cur_val < tag_val) {
      less.push(cur_val)
    } else if (cur_val > tag_val) {
      more.push(cur_val)
    }
  }
  // 递归的将小数组、中位项、大数组拼接
  return quickSort(less).concat([tag_idx], quickSort(more))
}