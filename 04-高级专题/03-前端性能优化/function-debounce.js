/**函数防抖 
 * 重复操作 只执行最后一次
*/

// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = function (func, wait_time) {
  let timer_id = 0
  return function (...args) {
    // 如果已经设定过定时器了
    if (timer_id) {
      // 就重新计时
      clearTimeout(timer_id)
    }
    // 开始一个新的定时器
    timer_id = setTimeout(() => {
      // 延迟执行用户传入的方法
      func.apply(this, args)
    }, wait_time)
  }
}

