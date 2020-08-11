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
 * 数组中两个数的和为sum
 * @param {Array} array 
 * @param {Number} sum 
 */
function twoSum (array, sum) {
  // 鲁棒性*
  if (Array.isArray(array)) {
    // 保存已经遍历过的 值 及其 索引
    let map = {}
    for (let i = 0; i < array.length; i++) {
      // 如果有合适的值
      if (map[sum - array[i]] != undefined) {
        return [map[sum - array[i]], i] // 返回结果
      }
      else {
        map[array[i]] = i // 当前值存入map
      }
    }
  }
  return []
}

/**
 * 数组中所有三数合为0的不重复情况
 * @param {Array} array 
 */
function threeSum (array) {
  let result = []
  if (array && Array.isArray(array)) {
    // 1.数组去重
    let arr = array.filter((item, index) => {
      return index === array.indexOf(item, 0)
    })
    // 2.数组排序*排序函数
    arr.sort((a, b) => a - b)
    // 3.找到所有结果
    for (let i = 0; i < arr.length; i++) {
      let small = i + 1
      let big = arr.length - 1
      // 循环停止条件：small big 重合
      while (small < big) {
        let sum = arr[small] + arr[big] + arr[i]
        if (sum < 0) {
          small++
        }
        else if (sum > 0) {
          big--
        }
        else if (sum === 0) {
          // 保存一个结果
          result.push([arr[small], arr[big], arr[i]])
          // 跳过重复(继续检查)*
          while (array[small] == array[small - 1]) {
            small++
          }
          while (array[big] == array[big + 1]) {
            big--
          }
        }
      }
    }
  }
  return result
}

/**
 * 数组中所有四数合为sum的不重复情况
 * @param {Array} array 
 * @param {Number} sum 
 */
function fourSum (array, sum) {
  // 0.鲁棒性*
  if (array.length < 4) {
    return []
  }
  // 1.数组去重排序
  let arr = array.filter((item, index, array) => {
    return index == array.indexOf(item)
  })
  arr.sort((a, b) => a - b)
  // console.log(arr);
  // 2.找到所有情况
  let result = []
  // i要留出三个数的位置*
  for (let i = 0; i < arr.length - 3; i++) {
    // 如果i后数字重复则continu
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue
    }
    // 如果最小的四个数都比0大
    if (arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3] > 0) {
      break
    }
    // j 留出两个数的位置
    for (let j = i + 1; j < arr.length - 2; j++) {
      // 开头跳过重复数字
      if (j > i + 1 && arr[j] === arr[j - 1]) {
        continue
      }
      let small = j + 1,
        big = arr.length - 1
      while (small < big) {
        let sum = arr[i] + arr[j] + arr[small] + arr[big]
        // console.log("i："+i+"，j:"+j+"，sum:"+sum);
        if (sum == 0) {
          result.push([arr[i], arr[j], arr[small], arr[big]])
        }
        if (sum <= 0) {
          // 跳过重复
          do {
            small++
          } while (arr[small] === arr[small + 1])
        }
        else if (sum > 0) {
          // 跳过重复
          do {
            big--
          } while (arr[big] === arr[big - 1])
        }
      }
    }
  }
  return result
}

console.log(fourSum([1, 2, 3, -1, -2, -3, -3, 1, 3]))