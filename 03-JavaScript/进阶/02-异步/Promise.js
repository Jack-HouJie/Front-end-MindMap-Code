// 定义三种状态常量
const PENDING = 'pending'
const REJECTED = 'rejected'
const RESOLVED = 'resolved'

// 自定义Pormise对象
function MyPromise (func) {
  const that = this
  // 当前Promise状态
  that.state = PENDING
  // 用于保存异步结果：
  // 传入resolve()和reject()的值
  that.value = []
  // 保存.then()中的回调函数
  that.resolve_cb = []
  that.reject_cb = []

  // 成功时的处理函数
  function resolve (value) {
    // 如果当前是等待中状态
    if (that.state == PENDING) {
      // 更新状态
      that.state = RESOLVED
      // 接受参数
      that.value = value
      // 按顺序执行已有回调函数（实现链式调用）
      that.resolve_cb.map(cb => cb(that.value))
    }
  }
  // 失败时的处理函数
  function reject (value) {
    if (that.state == PENDING) {
      that.state = REJECTED
      that.value = value
      that.reject_cb.map(cb => cb(that.value))
    }
  }
  // 执行处理函数
  try {
    func(resolve, reject)
  } catch (error) {
    reject(e)
  }
}

// 定义 添加新回调函数的方法.then()
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  // 判断参数(成功/失败的回调函数)是否存在，不存在使用默认
  const onFulfilled = typeof onFulfilled === 'Function' ? onFulfilled : function (value) {
    return value
  }
  const onRejected = typeof onRejected === 'Function' ? onRejected : function (error) {
    throw new Error(error)
  }
  // Promise为等待态时
  if (that.state == PENDING) {
    // 当前then()中的回调函数入队
    that.resolve_cb.push(onFulfilled)
    that.reject_cb.push(onRejected)
  }
  // Promise为成功态时
  if (that.state = RESOLVED) {
    // 直接执行onFulfilled
    onFulfilled(that.value)
  }
  // Promise为失败态时
  if (that.state = RESOLVED) {
    // 直接执行onFulfilled
    onRejected(that.value)
  }
}
