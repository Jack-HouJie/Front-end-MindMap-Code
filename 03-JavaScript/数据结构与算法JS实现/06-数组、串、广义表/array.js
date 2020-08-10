/* 双指针问题 */
/** 调整数组顺序，使得奇数在前偶数在后
 * 
 * @param {Array} array 
 */
function reOrderArray (array) {
  // 鲁棒性*
  if (Array.isArray(array)) {
    let start = 0
    let end = arr.length - 1
    while (start != end) {
      // 从前往后找到下一个偶数的下标
      while (array[start] % 2 === 1) {
        start++
      }
      // 从后往前找到下一个奇数的下标
      while (array[end] % 2 === 0) {
        end--
      }
      // 如果顺序错误
      if (start < end) {
        // 交换值*
        [array[start], array[end]] = [array[end], array[start]]
      }
    }
    return array
  }

}
/** 找到和为sum的两个数字（多种情况取乘积最小）
 * 
 * @param {Array} array 
 * @param {Number} sum 
 */
function findNumbersWithSum (array, sum) {
  let left = 0
  let right = array.length - 1
  // 循环到所有数全试过一次*
  while (left < right) {
    if (left + right < sum) {
      left++
    }
    else if (left + right > sum) {
      right--
    } else {
      return [array[left], array[right]]
    }
  }
  return []
}
/** 输出和为sum的连续正整数序列
 * 
 * @param {Number} sum 
 */
function findContinuousSequence (sum) {
  let result = [],
    small = 1,
    big = 2,
    child = [1, 2],
    cur_sum = 3
  while (big <= Math.floor(sum / 2)) {
    // 调整大小
    while (cur_sum < sum) {
      child = child.push(++big)
      cur_sum += big
    }
    // 调整大小
    while (cur_sum > sum) {
      child = child.shift()
      cur_sum -= ++small
    }
    // 如果恰是结果
    if (currentSum === sum) {
      // 更新结果
      result.push(child.toString())
      // 更新当前和以跳出循环
      cur_sum += ++big
    }
  }
  return result
}

/** n 个数的和问题 */
/**
 * 找到数组中两个数的和为sum
 * @param {Array} array 
 * @param {Number} sum 
 */
function twoSum (array, sum) {
  // 鲁棒性*
  if (Array.isArray(array)) {
    let small_idx = 0
    let big_idx = 1
    
  }
}