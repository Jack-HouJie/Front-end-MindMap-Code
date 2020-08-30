const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

/** 实现Promise
 * 
 * @param {Function} func 异步处理函数,参数resolve,reject 
 */
function MyPromise (func) {
  const that = this
  that.value = null
  that.state = PENDING
  that.resolve_cbs = []
  that.reject_cbs = []
  function resolve (value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      // 通过that调用*
      that.resolve_cbs.map(cb => cb(that.value))
    }
  }
  function reject (value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.reject_cbs.map(cb => cb(that.value))
    }
  }
  try {
    func(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

/** Promise.then()
 * 链式添加回调
 * @param {Function} onResolve 增加的成功回调函数(可选)
 * @param {Function} onReject 增加的失败回调函数(可选)
 */
MyPromise.prototype.then = function (onResolve, onReject) {
  const onResolve = typeof onResolve == 'Function' ? onResolve : val => val
  const onReject = typeof onReject == 'Function' ? onReject : err => {
    throw new Error(err)
  }
  if (this.state === PENDING) {
    this.resolve_cbs.push(onResolve)
    this.reject_cbs.push(onReject)
  }
  else if (this.state === RESOLVED) {
    onResolve(this.value)
  }
  else if (this.state === REJECTED) {
    onReject(this.value)
  }
}
