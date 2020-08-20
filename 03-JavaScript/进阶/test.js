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
  console.log("debounce1s" + new Date())
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

// 三个常量用于表示状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise (fn) {
  const that = this
  this.state = PENDING

  // value 变量用于保存 resolve 或者 reject 中传入的值
  this.value = null

  // 用于保存 then 中的回调，
  // 因为当执行完 Promise 时状态可能还是等待中，
  // 这时候应该把 then 中的回调保存起来用于状态改变时使用
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []


  function resolve (value) {
    // 首先两个函数都得判断当前状态是否为等待中
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      // 遍历回调数组并执行
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }
  function reject (value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }

  // 完成以上两个函数以后，我们就该实现如何执行 Promise 中传入的函数了
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}


