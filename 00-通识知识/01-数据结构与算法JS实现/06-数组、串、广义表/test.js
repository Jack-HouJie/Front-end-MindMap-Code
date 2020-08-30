/* 双指针问题 */
/** 调整数组顺序，使得奇数在前偶数在后
 * 
 * @param {Array} array 
 */
function reOrderArray (array) {
  let left = 0
  let right = array.length - 1
  while (left < right) {
    if (array[left] % 2 == 0) {
      // 交换值简写*
      [array[left], array[right]] = [array[right], array[left]]
      right--
    }
    else {
      left++
      if (array[right] % 2 !== 0) {
        [array[left], array[right]] = [array[right], array[left]]
        left++
      }
      else {
        right--
      }
    }
  }
  return array
}
// let result = reOrderArray([1, 2, 3, 4, 5, 7])

/** 找到和为sum的两个数字（多种情况取乘积最小）
 * 
 * @param {Array} array 
 * @param {Number} sum 
 */
function findNumbersWithSum (array, sum) {
  let left = 0
  let right = array.length - 1
  while (array[left] + array[right] != sum) {
    if (array[left] + array[right] < sum) {
      left++
    }
    else if (array[left] + array[right] > sum) {
      right--
    }
    if (left == right) {
      return null
    }
  }
  return [array[left], array[right]]
}
// let result = findNumbersWithSum([1, 2, 3, 4, 5], 3)

/** 输出和为sum的连续正整数序列*
 * 
 * @param {Number} sum 
 */
function findContinuousSequence (sum) {
  if (sum < 3) {
    throw new Error('sum error!')
  }
  let result = []
  let small = 1
  let big = 2
  let cur_child = [1, 2]
  let cur_sum = 3
  while (big < sum / 2) {
    while (cur_sum < sum) {
      cur_child.push(++big)
      cur_sum += big
    }
    while (cur_sum > sum) {
      cur_child.shift()
      cur_sum -= small++
    }
    if (cur_sum == sum) {
      result.push(small + "-" + big)
      // 更新以跳出循环*
      cur_sum += ++big
    }
  }
  return result
}
// let result = findContinuousSequence(15)

/** n 个数的和问题 */
/** 数组中两个数的和为sum
 * 给定一个整数数组 array 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 * @param {Array} array 
 * @param {Number} sum 
 */
function twoSum (array, sum) {
  // 鲁棒性*
  if (!Array.isArray(array)) {
    throw new Error('argument error!')
  }
  // 保存已经遍历过的 值 及其 索引
  let map = {}
  for (let i = 0; i < array.length; i++) {
    // 如果有合适的值*
    if (map[sum - array[i]] != undefined) {
      // 返回结果
      return [map[sum - array[i]], i]
    }
    // 没有合适的值
    else {
      // 当前值存入map
      map[array[i]] = i
    }
  }
  return null
}
// let result = twoSum([1, 2, 3, 5, 6], 3)

/** 数组中所有三数合为0的不重复情况*
 * 
 * @param {Array} array 
 */
function threeSum (array) {
  // 数组排序
  array.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < array.length; i++) {
    // 跳过重复数字
    if (i && array[i] === array[i - 1]) { continue; }
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      let sum = array[i] + array[left] + array[right];
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        result.push([array[i], array[left++], array[right--]]);
        // 跳过重复数字
        while (array[left] === array[left - 1]) {
          left++;
        }
        // 跳过重复数字
        while (array[right] === array[right + 1]) {
          right--;
        }
      }
    }
  }
  return result;
}
// let result = threeSum([-1, 0, 1, 2, -1, -4])

/** 数组中所有四数合为sum的不重复情况
 * 
 * @param {Array} array
 */
function fourSum (array) {
  
}

let result = fourSum([1, 2, 3, -1, -2, -3, -3, 1, 3], 5)
console.log(result)