/** 得到10个随机两位数，返回按顺序排列数组
 * 
 */
function getRandomArr () {
  let result = new Array(10)
  for (let i = 0; i < 10; i++) {
    result[i] = Math.floor(10 + Math.random() * 90)
  }
  return result.sort()
}
console.log(getRandomArr());