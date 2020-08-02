// 非动态规划实现
function fib (n) {
  // 递归终止：前两项返回自身
  if (n >= 0 && n < 2) {
    return n
  }
  // 递归的求第三项后
  return fib(n - 1) + fib(n - 2)
}
// 动态规划实现
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
