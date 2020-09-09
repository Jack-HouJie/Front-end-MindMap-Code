let arr = [1, 3, 5, 7, 2, 4, 6, 8]
/** 二分查找
 * https://www.cnblogs.com/meiren1314/p/3955537.html
 * 查找指定val返回索引，失败返回null
 * @param {Array} arr 目标数组
 * @param {*} data 匹配目标数据
 * @param {Number} start 查询起始位置
 * @param {Number} end 查询终点位置
 */
function binarySearch (data, arr, start, end) {
  if (start > end) {
    return -1
  }
  let mid = Math.floor((end + start) >> 1)
  if (data == arr[mid]) {
    return mid
  } else if (data < arr[mid]) {
    return binarySearch(data, arr, start, mid - 1)
  } else {
    return binarySearch(data, arr, mid + 1, end)
  }
}

/** 旋转数组的最小数字
 * 
 * @param {Array} arr 
 */
function minNumberInRotateArray (arr) {
  if (!arr.length) {
    return null
  }
  let start = 0
  let end = arr.length - 1
  while (start < end) {
    let mid = Math.floor((start + end) >> 1)
    // 出现这种情况的array类似[3,4,5,6,0,1,2]，
    // 此时最小数字一定在mid的右边。 
    if (arr[mid] > arr[end]) {
      start = mid + 1;
    }
    // 出现这种情况的array类似 [1,0,1,1,1]或者[1,1,1,0,1]，
    // 此时最小数字不好判断在mid左边还是右边,这时只好一个一个试 。
    else if (arr[mid] == arr[end]) {
      end = end - 1;
    }
    // 出现这种情况的array类似[2,2,3,4,5,6,6],
    // 此时最小数字一定就是array[mid]或者在mid的左边。
    // 因为右边必然都是递增的。
    else {
      end = mid;
    }
  }
  return arr[start]

}

/** 统计一个数字在排序数组中出现的次数
 * 
 * @param {*} data 
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} end 
 */
function getNumberOfK (data, arr, start, end) {
  let firstNumIdx = getFirstNum(data, arr, start, end)
  let lastNumIdx = getLastNum(data, arr, start, end)
  if (firstNumIdx === -1 || lastNumIdx === -1) {
    return null
  }
  return lastNumIdx - firstNumIdx + 1
}
/** 排序数组中找到数字第一次出现的索引
 * 找到目标值，并且前一位的数字和当前值不相等
 * @param {*} data 
 * @param {*} arr 
 * @param {*} start 
 * @param {*} end 
 */
function getFirstNum (data, arr, start, end) {
  if (start > end) {
    return -1
  }
  let mid = Math.floor((start + end) >> 1)
  if (arr[mid] === data) {
    if (arr[mid - 1] !== data) {
      return mid
    }
    else {
      return getFirstNum(data, arr, start, mid - 1)
    }
  }
  else if (arr[mid] > data) {
    return getFirstNum(data, arr, start, mid - 1)
  }
  else if (arr[mid] < data) {
    return getFirstNum(data, arr, mid + 1, end)
  }
}
/** 排序数组中找到数字最后一次出现的索引
 * 找到目标值，并且后一位的数字和当前值不相等
 * @param {*} data 
 * @param {*} arr 
 * @param {*} start 
 * @param {*} end 
 */
function getFirstNum (data, arr, start, end) {
  if (start > end) {
    return -1
  }
  let mid = Math.floor((start + end) >> 1)
  if (arr[mid] === data) {
    if (arr[mid + 1] !== data) {
      return mid
    }
    else {
      return getFirstNum(data, arr, mid + 1, end)
    }
  }
  else if (arr[mid] > data) {
    return getFirstNum(data, arr, start, mid - 1)
  }
  else if (arr[mid] < data) {
    return getFirstNum(data, arr, mid + 1, end)
  }
}
