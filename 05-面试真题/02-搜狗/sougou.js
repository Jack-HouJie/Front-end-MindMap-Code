/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 返回能交换奖品的最大数量
 * @param a int整型 
 * @param b int整型 
 * @param c int整型 
 * @return int整型
 */
function numberofprize (a, b, c) {
  // 找到最小值
  let max = a < b ? a : b
  max = max < c ? min : c
  let a1 = a - min
  let b1 = b - min
  let c1 = c - min
  
}