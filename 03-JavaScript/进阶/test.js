// 实现call
Function.prototype.myCall = function (ctx) {
  // 创建临时方法
  ctx.func = this
  // 截取参数(除ctx)
  const args = [...arguments].slice(1)
  // 得到结果，删除方法*，返回结果
  let result = ctx.func(args)
  delete ctx.func
  return result
}
// 实现apply
Function.prototype.myApply = function (ctx) {
  // 创建临时方法
  ctx.func = this
  let result = null
  // 判断参数存在*
  if (arguments[1]) {
    // 得到结果
    result = ctx.func(...arguments[1])
  } else {
    // 得到结果
    reslut = ctx.func()
  }
  // 删除方法返回结果
  delete ctx.func
  return result
}
// 实现bind
Function.prototype.myBind = function (ctx) {
  let _this = this // 保存函数
  let args = [...arguments].slice(1) // 截取参数
  // 返回一个函数，形成闭包
  return function F () {
    // 如果返回的函数F被通过new调用
    if (this instanceof F) {
      // 仅实现柯里化（额外参数）
      return new _this(args, ...arguments)
    }
    // 正常调用则通过apply实现绑定+柯里化
    return _this.myApply(ctx, args.concat(...arguments))
  }
}
// 实现防抖
function debounce (func, wait_time) {
  let timerId = 0
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, wait_time)
  }
}
setInterval(debounce(() => {
  // 某些操作
  console.log("debounce1s"+ new Date())
}, 1000), 1000)


// 实现节流
function throttle (func, wait_time) {
  let last_time = 0
  return function (...args) {
    let cur_time = + new Date()
    if (cur_time - last_time > wait_time) {
      last_time = cur_time
      func.apply(this, args)
    }
  }
}
// setInterval(throttle(() => {
//   // 某些操作
//   console.log(new Date())
// }, 2000), 500)

// 实现Promise

// 实现then
