// 定义三种状态常量
const PENDING = 'pending'
const REJECTED = 'rejected'
const RESOLVED = 'resolved'

/** 自定义Pormise对象
 * 
 * @param {Funciton} func // 异步处理的函数 
 */
function  (func) {
  const that = this
  // 状态初始化为pending
  that.state = PENDING
  // 保存异步结果，将来传入resolve()和reject()
  that.value = []
  // 保存所有回调函数
  that.resolve_cbs = []
  that.reject_cbs = []

  // 定义成功时的处理函数,用于传入func,待func内异步操作结束后接收结果value
  function resolve (value) {
    if (that.state == PENDING) {
      // 更新Promise状态
      that.state = RESOLVED
      // 更新Promise当前异步结果
      that.value = value
      // 按顺序执行已有回调函数（实现链式调用）
      that.resolve_cbs.map(cb => cb(that.value))
    }
  }
  // 定义失败时的处理函数,用于传入func,待func内异步操作结束后接收结果value
  function reject (value) {
    if (that.state == PENDING) {
      that.state = REJECTED
      that.value = value
      that.reject_cbs.map(cb => cb(that.value))
    }
  }

  // 执行传入的函数，将成功失败处理函数作为参数传入
  try {
    func(resolve, reject)
  } catch (error) {
    reject(error)
  }
}


/** MyPromise方法.then()
 * 用于链式添加新回调函数
 * @param {*} onResolve 成功结果的处理函数（可选），参数：结果值（可选）
 * @param {*} onReject 失败结果的处理函数（可选），参数：结果值（可选）
 * @return {MyPromise} 一个新Promise对象
 */
MyPromise.prototype.then = function (onResolve, onReject) {
  const that = this
  // 无参数时设置默认函数
  const onResolve = typeof onResolve === 'Function' ? onResolve : v => v
  const onReject = typeof onReject === 'Function' ? onReject : err => console.log(err)
    
  // 调用then时如果Promise为等待态
  // 异步函数func中的异步操作未结束（未执行resolve()或reject()）
  if (that.state == PENDING) {
    // 当前then()中的回调函数入队,
    // 等异步函数func执行resolve()或reject()时统一链式调用
    that.resolve_cbs.push(onResolve)
    that.reject_cbs.push(onReject)
  }
  // 如果Promise为成功态
  if (that.state = RESOLVED) {
    // 直接执行onFulfilled
    onResolve(that.value)
  }
  // 如果Promise为失败态
  if (that.state = RESOLVED) {
    // 直接执行onFulfilled
    onReject(that.value)
  }
}
