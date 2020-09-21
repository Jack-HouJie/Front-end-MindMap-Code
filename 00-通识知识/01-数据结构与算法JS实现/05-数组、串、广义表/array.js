/* 双指针问题 */
/** 使数组奇数在前偶数在后*
 * @param {Array} array 
 */
function reOrderArray (array) {
  if (!Array.isArray(array)) {
    return null
  }
  let left = 0
  let right = array.length - 1
  while (left < right) {
    // 从做到右找到第一个偶数
    while (array[left] % 2 === 1) {
      left++
    }
    // 从右到左找到第一个奇数
    while (array[right] % 2 === 0) {
      right--;
    }
    // 偶在前则交换位置
    if (left < right) {
      [array[left], array[right]] = [array[right], array[left]]
    }
  }
  return array
}
// let result = reOrderArray([1, 2, 3, 4, 5, 7])

/** 排序数组中找到和为sum的两个数字（多种情况取乘积最小）
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

/** 输出和为sum的连续正整数序列
 * @param {Number} sum 
 */
function findContinuousSequence (sum) {
  if (sum < 3 || typeof sum === Number) {
    return null
  }
  let result = []
  let child = [1, 2]
  let big = 2
  let small = 1
  let curSum = 3
  let max = (sum >> 1) + 1
  while (big <= max) {
    // 结果较小，则在范围内增大big
    while (curSum < sum && big <= max) {
      child.push(++big)
      curSum += big
    }
    // 结果较大，则在范围内增大small
    while (curSum > sum && small < big) {
      child.shift()
      curSum -= small++
    }
    // 得到结果时保存
    if (curSum === sum && small < big) {
      result = child.slice(0)
      break
    }
  }
  return result;
}
// console.log(findContinuousSequence(100))

/** n 个数的和问题 */
/** 两数之和*
 * 数组中两个数的和为sum：
 * 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那两个整数，
 * 并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。
 * 但是，你不能重复利用这个数组中同样的元素。
 * @param {Array} array 
 * @param {Number} sum 
 * @return {Array} [idx1,idx2]
 */
function twoSum (array, sum) {
  // 鲁棒性*
  if (!Array.isArray(array)) {
    return null
  }
  // 保存已经遍历过的 值 及其 索引
  let map = {}
  for (let i = 0; i < array.length; i++) {
    // 如果存储过合适的值
    if (map[sum - array[i]] !== undefined) {
      return [map[sum - array[i]], i] // 返回结果
    }
    else {
      map[array[i]] = i // 保存当前值及其索引
    }
  }
}

/** 三数之和*
 * 数组中所有三数合为0的不重复情况
 * 思路：第一个数作为基准数，后两个数和为基准数相反数
 * @param {Array} array 
 */
function threeSum (array) {
  // 数组排序
  array.sort((a, b) => a - b)
  let result = []
  for (let i = 0; i < array.length; i++) {
    // 跳过重复数字
    if (i && array[i] === array[i - 1]) {
      continue
    }
    let left = i + 1
    let right = array.length - 1
    while (left < right) {
      let sum = array[i] + array[left] + array[right]
      if (sum > 0) {
        right--
      } else if (sum < 0) {
        left++
      } else {
        result.push([array[i], array[left++], array[right--]]);
        // 跳过重复数字，继续寻找可能的结果
        while (array[left] === array[left - 1]) {
          left++
        }
        while (array[right] === array[right + 1]) {
          right--
        }
      }
    }
  }
  return result;
}

/** 四数之和
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
// console.log(fourSum([1, 2, 3, -1, -2, -3, -3, 1, 3]))

/** 二维数组问题 */
/** 构建乘积数组*
 * 给定一个数组A[0,1,...,n-1],
 * 请构建一个数组B满足
 * B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。
 * 不能使用除法。
 * @param {Array} array 
 */
function multiply (arrA) {
  // 0.鲁棒性*
  if (Array.isArray(arrA) && arrA.length > 0) {
    return null
  }
  // 定长的数组才能fill*
  let arrB = new Array(arrA.length)
  arrB.fill(1)
  // i为当前计算的B的下标
  for (let i = 0; i < arrA.length; i++) {
    // 乘属于下三角的数
    for (let j = 0; j < i; j++) {
      arrB[i] *= +arrA[j]
    }
    // 乘属于上三角的数
    for (let j = arrA.length - 1; j > i; j--) {
      arrB[i] *= +arrA[j]
    }
  }
  return arrB
}
// let result = multiply([1, 2, 3, 4, 5]);

/** 顺时针打印矩阵*
 * @param {Array} matrix 基础矩阵
 */
function printMatrix (matrix) {
  let circle = 0  // 当前圈数（从外向内）
  let rows = matrix.length // 矩阵宽(行数)
  let colums = matrix[0].length // 矩阵高(列数)
  let result = [] // 结果
  // 当矩阵宽高足够打印时
  while (rows > (circle << 1) - 1 && colums > (circle << 1) - 1) {
    printCircle(matrix, rows, colums, circle, result) // 打印一圈
    circle++ // 更新当前圈
  }
  return result
}
/** 矩阵顺时针打印一圈
 * 思路：将打印一圈拆解为四步，
 * 处理最后一圈的异常情况
 * @param {Array} matrix 基础矩阵
 * @param {Number} rows 基础矩阵宽(行数)
 * @param {Number} coloums 基础矩阵高(列数)
 * @param {Number} circle 要打印的圈数
 * @param {Array} result 保存结果的数组
 */
function printCircle (matrix, rows, colums, circle, result) {
  // 本圈剩余矩阵宽高（行数、列数）
  let curRows = rows - circle << 1
  let curColums = colums - circle << 1
  // 从左至右打印一行
  for (let i = 0; i < colums - circle * 2; i++) {
    result.push(matrix[circle][i])
  }
  // 如果结束行号大于开始行号
  if (curRows > 2) {
    // 从上至下打印一列
    for (let i = circle + 1; i < rows - circle; i++) {
      result.push(matrix[i][colums - circle - 1])
    }
    // 结束列号大于开始列号
    if (curColums > 2) {
      // 从右至左打印一行
      for (let i = colums - circle - 2; i > circle - 1; i--) {
        result.push(matrix[rows - circle - 1][i])
      }
      // 结束行号大于开始行号+1
      if (curRows > 3) {
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
  let numCount = {}
  for (let num in array) {
    let old = numCount[array[num]]
    numCount[array[num]] = old ? old + 1 : 1
    if (numCount[array[num]] > array.length >> 1) {
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
    let curSum = array[0]
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      if (curSum < 0) {
        curSum = array[i]
      }
      else {
        curSum = curSum + array[i]
        max = curSum > max ? curSum : max
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
    let spaceNum = 0
    let jokerNum = 0
    for (let i = 0; i < arr.length; i++) {
      // 判断大小王
      if (arr[i] == 0) {
        jokerNum += 1
      }
      // 除第一项
      else if (i > 0) {
        let cur_space = arr[i] - arr[i - 1] - 1
        if (cur_space == -1) {
          return false
        }
        // 要考虑前一项是王的情况*
        else if (cur_space != arr[i] - 1) {
          spaceNum += cur_space
        }
      }
    }
    if (spaceNum <= jokerNum) {
      return true
    } else {
      return false
    }
  }
  return false
}
// let result = isContinuous([3, 8, 4, 0])
/** 第一个只出现一次的字符
 * 用一个map存储每个字符出现的字数,
 * 第一次循环存储次数，
 * 第二次循环找到第一个出现一次的字符。
 * @param {String} str 
 */
function firstNotRepeatingChar (str) {
  if (str) {
    let arr = str.split("")
    let charCount = {}
    for (let idx in arr) {
      let oldCount = charCount[arr[idx]]
      charCount[arr[idx]] = oldCount ? oldCount + 1 : 1
    }
    for (let char in charCount) {
      if (charCount[char] == 1) {
        return char
      }
    }
  }
  return " "
}
// let result = firstNotRepeatingChar("123ssd36123f")
console.log(result)