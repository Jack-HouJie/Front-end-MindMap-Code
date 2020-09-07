/** 分发饼干
 * 贪心思路：优先满足胃口小的小朋友的需求
 * @param {*} g 每个孩子的胃口值
 * @param {*} s 每个饼干可满足的胃口
 */
function findContentChildren (g, s) {
  let gIndex = 0, sIndex = 0, res = 0
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  // 当孩子饼干都有时
  while (gIndex < g.length && sIndex < s.length) {
    // 如果当前饼干满足胃口最小的孩子
    if (s[sIndex] >= g[gIndex]) {
      res++ // 结果加一个孩子
      gIndex++ // 当前最小胃口孩子已满足，跳过
    }
    // 处理当前饼干
    // 满足时分发给孩子
    // 不满足时扔掉:满足不了最小的孩子时后面也满足不了
    sIndex++
  }
  return res
}
console.log(findContentChildren([3, 4, 5], [2, 3, 5]))
