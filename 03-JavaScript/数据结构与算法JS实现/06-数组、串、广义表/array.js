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
/** 数组中两个数的和为sum
 * 
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

/** 数组中所有三数合为0的不重复情况
 * 
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

/** 数组中所有四数合为sum的不重复情况
 * 
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
// console.log(fourSum([1, 2, 3, -1, -2, -3, -3, 1, 3]))

/** 二维数组问题 */
/** 构建乘积数组
 * 
 * @param {Array} array 
 */
function multiply (array_a) {
  // 定长的数组才能fill*
  let array_b = new Array(array_a.length)
  array_b.fill(1)
  // 鲁棒性*
  if (Array.isArray(array_a) && array_a.length > 0) {
    // 当前计算的B的下标
    for (let i = 0; i < array_a.length; i++) {
      for (let j = 0; j < i; j++) {
        array_b[i] *= +array_a[j]
      }
      for (let j = array_a.length - 1; j > i; j--) {
        array_b[i] *= +array_a[j]
      }
    }
  }
  return array_b
}
// let result = multiply([1, 2, 3, 4, 5]);

/** 顺时针打印矩阵
 * 
 * @param {Array} matrix 
 */
function printMatrix (matrix) {
  let circle = 0  // 第几圈
  let rows = matrix.length // 矩阵行数
  let colums = matrix[0].length // 矩阵列数
  let result = [] // 结果
  // 当矩阵足够打印时
  while (rows > circle * 2 - 1 && colums > circle * 2 - 1) {
    printCircle(matrix, rows, colums, circle, result) // 打印一圈
    circle++ // 更新当前圈
  }
  return result
}
/** 矩阵顺时针打印一圈
 *
 * @param {Array} matrix
 * @param {Number} rows
 * @param {Number} coloums
 * @param {Number} circle
 * @param {Array} result 
 */
function printCircle (matrix, rows, colums, circle, result) {
  // 本圈剩余矩阵大小
  let cur_rows = rows - circle << 1
  let cur_colums = colums - circle << 1
  // 从左至右打印一行
  for (let i = 0; i < colums - circle * 2; i++) {
    result.push(matrix[circle][i])
  }
  if (cur_rows > 2) {
    // 从上至下打印一列
    for (let i = circle + 1; i < rows - circle; i++) {
      result.push(matrix[i][colums - circle - 1])
    }
    if (cur_colums > 2) {
      // 从右至左打印一行
      for (let i = colums - circle - 2; i > circle - 1; i--) {
        result.push(matrix[rows - circle - 1][i])
      }
      if (cur_rows > 3) {
        // 从下至上打印一行
        for (let i = rows - circle - 2; i > circle; i--) {
          result.push(matrix[i][circle])
        }
      }
    }
  }

}
// let result = printMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])

/** 数据统计问题 */
/** 找出数组中的一个数字，其出现的次数超过数组长度的一半
 * 
 * @param {Array} array 
 */
function moreThanHalfNum (array) {
  let num_count = {}
  for (let num in array) {
    let old = num_count[array[num]]
    num_count[array[num]] = old ? old + 1 : 1
    if (num_count[array[num]] > array.length >> 1) {
      return array[num]
    }
  }
  return 0
}
// let result = moreThanHalfNum([1, 1, 1, 3, 2, 1, 1, 5])
/** 连续子数组的最大和
 * 
 * @param {Array} array 
 */
function findGreatestSumOfSubArray (array) {
  // 鲁棒性
  if (Array.isArray(array) && array.length > 0) {
    let cur_sum = array[0]
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      if (cur_sum < 0) {
        cur_sum = array[i]
      }
      else {
        cur_sum = cur_sum + array[i]
        max = cur_sum > max ? cur_sum : max
      }
    }
    return max
  }
  return 0
}
// let result = findGreatestSumOfSubArray([-1, 2, -1, 3, -1])
/** 判断扑克牌顺子
 * 
 * @param {Array} array 0-13 0为大小王 
 */
function isContinuous (array) {
  if (Array.isArray(array) && array.length > 1) {
    let arr = array
    arr.sort((a, b) => a - b)
    let space_num = 0
    let joker_num = 0
    for (let i = 0; i < arr.length; i++) {
      // 判断大小王
      if (arr[i] == 0) {
        joker_num += 1
      }
      // 除第一项
      else if (i > 0) {
        let cur_space = arr[i] - arr[i - 1] - 1
        if (cur_space == -1) {
          return false
        }
        // 要考虑前一项是王的情况*
        else if (cur_space != arr[i] - 1) {
          space_num += cur_space
        }
      }
    }
    if (space_num <= joker_num) {
      return true
    } else {
      return false
    }
  }
  return false
}
// let result = isContinuous([3, 8, 4, 0])
/** 第一个只出现一次的字符
 * 
 * @param {String} str 
 */
function firstNotRepeatingChar (str) {
  if (str) {
    let arr = str.split("")
    console.log(arr);
    let char_count = {}
    for (let idx in arr) {
      let old_count = char_count[arr[idx]]
      char_count[arr[idx]] = old_count ? old_count + 1 : 1
    }
    for (let char in char_count) {
      if (char_count[char] == 1) {
        return char
      }
    }
  }
  return ""
}
// let result = firstNotRepeatingChar("123ssd123f")
console.log(result)