/**函数节流 
 * 重复操作一段时间内只执行一次
*/
// 原生实现函数节流
function throttle (func, wait_time) {
  // func是用户传入需要节流的函数
  // wait是等待时间
  let last_time = 0
  return function (...arg) {
    let cur_time = + new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间
    if (cur_time - last_time > wait_time) {
      last_time = cur_time
      func.apply(this, args)
    }
  }
}
setInterval(
  throttle(() => {
    // 实际操作
    return console.log('test')
  }, 500),
  100
)

