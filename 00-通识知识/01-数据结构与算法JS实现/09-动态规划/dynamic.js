
/** 斐波那契数列
 * @param {Number} n 项数
 */
function fib (n) {
  let result = new Array(n).fill(null)
  // 固定前两项的值
  result[0] = 0
  result[1] = 1
  // 子问题：根据前两项求第三项
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result
}

/** 矩形覆盖问题
 * 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 * @param {Number} n 
 */
function rectCover (n) {
  let result = new Array(n - 1)
  result[0] = 1
  result[1] = 2
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n - 1]
}

/** 青蛙跳台阶问题
 * 青蛙跳台阶：一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 * @param {Number} n 项数
 */
function jumpFloor (n) {
  let result = new Array(n).fill(null)
  // 固定前两项的值
  result[0] = 1
  result[1] = 2
  // 子问题：根据前两项求第三项
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n - 1]
}

/** 变态跳台阶
 * 可以选择跳1-n阶
 * 思路
 * 前n-1个台阶可以考虑跳或不跳，最后一个必跳
 * @param {Number} n 
 */
function jumpFloorPlus (n) {
  return 1 << (n - 1)
}

/* 路径问题 */


/* 买卖股票类问题 */
/**买卖股票的最佳时机
 * 
 * @param {Array} arr 
 */
function maxProfit (arr) {
  let dp = [0]
  let min = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], arr[i] - min[i - 1])
    min[i] = Math.min(arr[i], min[i - 1])
  }
  return dp[arr.length - 1]
}
// console.log(maxProfit([4, 3, 2, 3, 4, 5, 7, 3, 5, 2]));

/** 打家劫舍
 * 
 * @param {Number} arr 
 */
function rob (arr) {
  let dp = [0, arr[0]]
  for (let i = 2; i < arr.length + 1; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i])
  }
  return dp[arr.length]
}