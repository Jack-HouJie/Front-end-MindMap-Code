/* easy */
/** 1.打家劫舍 
 * https://leetcode-cn.com/problems/house-robber/
 * @param {Array} nums
 * @return {Number}
 */
var rob = function (nums) {
  const length = nums.length
  if (length === 0) {
    return 0
  }
  const dp = new Array(length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[length - 1]
}
// console.log(rob([1, 2, 3, 4, 5]));

/** 2.秘钥格式化
 * https://leetcode-cn.com/problems/license-key-formatting/
 * @param {String} S 要格式化的秘钥字符串
 * @param {Number} K 每组字符数
 * @return {String}
 */
var licenseKeyFormatting = function (S, K) {
  let arr = S.split('-').join('').toUpperCase().split('')
  let temp = 0
  for (let i = arr.length - 1; i > 0; i--) {
    ++temp
    if (temp === K) {
      arr.splice(i, 0, '-')
      temp = 0
    }
  }
  return arr.join('')
}
// console.log(licenseKeyFormatting('s221df-wef-sdfs', 3))

/** 3.同构字符串*
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  let mapS = {}, mapT = {}
  let length = s.length
  for (let i = 0; i < length; i++) {
    if (!mapS[s[i]]) {
      mapS[s[i]] = t[i]
    }
    if (!mapT[t[i]]) {
      mapT[t[i]] = s[i]
    }
    if (mapS[s[i]] != t[i] || mapT[t[i]] != s[i]) {
      return false
    }
  }
  return true
}

/** 4.连续子数组的最大和
 * @param {Number[]} nums
 * @return {Number}
 */
var maxSubArray = function (nums) {
  const length = nums.length
  let result = nums[0]
  let curSum = nums[0]
  for (let i = 1; i < length; i++) {
    if (curSum < 0) {
      curSum = nums[i]
    }
    else {
      curSum += nums[i]
    }
    result = result > curSum ? result : curSum
  }
  return result
}

/** 5.找到唯一一个只出现一次的数字
 * https://leetcode-cn.com/problems/single-number/submissions/
 * 思路：先排序遍历判断
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  nums.sort()
  for (let i = 0; i < nums.length; i += 2) {
    if (nums[i] !== nums[i + 1]) {
      return nums[i]
    }
  }
  return null
}

/** 6.反转数字
 * @param {Number} x
 * @return {Number}
 */
var reverse = function (x) {
  let str = ''
  if (x < 0) {
    str = (-x) + ''
    let arr = str.split('').reverse()
    while (arr[0] === 0) {
      arr.shift()
    }
    let result = -parseInt(arr.join(""))
    return -result > (2 ** 31) ? 0 : result
  } else {
    str = x + ''
    let arr = str.split('').reverse()
    while (arr[0] === 0) {
      arr.shift()
    }
    let result = parseInt(arr.join(""))
    return result > (2 ** 31 - 1) ? 0 : result
  }
}

/** 7.无重复字符的最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/submissions/
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s.length) {
    return 0
  }
  let sLen = s.length // 总长度
  let childStr = '' // 当前子串
  let childLen = 0 // 当前子串长度
  let charIdx = undefined // 当前处理字符在子串中的索引
  let maxLen // 最长子串  
  for (let i = 0; i < sLen; i++) {
    charIdx = childStr.indexOf(s[i])
    // 如果当前子串中 无 当前字符
    if (charIdx == -1) {
      // 当前字符加入子串
      childStr = childStr + s[i]
    }
    // 如果当前子串中 有 当前字符
    else {
      // 从字符索引之后到当前字符组成新的子串
      childStr = childStr.slice(charIdx + 1) + s[i]
    }
    // 得到本次处理后子串长度
    childLen = childStr.length
    // 更新结果
    maxLen = maxLen > childLen ? maxLen : childLen
  }
  return maxLen
}

/** 8.数组中的多数元素
 * @param {number[]} numsobj
 * @return {number}
 */
var majorityElement = function (nums) {
  let half = nums.length >> 1
  let map = {}
  for (let num of nums) {
    let curNum = map[num]
    map[num] = curNum ? curNum + 1 : 1
    if (map[num] > half) {
      return num
    }
  }
}

/** 1.两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (!Array.isArray(nums)) {
    return []
  }
  let map = {}
  let length = nums.length
  for (let i = 0; i < length; i++) {
    if (map[target - nums[i]] != undefined) {
      return [map[target - nums[i]], i]
    }
    else {
      map[nums[i]] = i
    }
  }
}