/**
 * 全局通用的同步try-catch方法
 * @param {Function} func 
 */
function tryCatchGlobal (func) {
  try {
    return func()
  } catch (e) {
    console.log(`同步异常捕捉_error:${e}`)
  }
}

/**
 * 全局通用的异步 promise-catch方法
 * @param {Function} asyncFunc 异步方法
 * @param {String} errMsg 
 */
function tryCatchGlobalPromise (asyncFunc, errMsg = "异步异常捕捉") {
  return new Promise((resolve, reject) => {
    // asyncFunc只能是异步方法,且必须返回一个Promise,
    // 否则会报错【Promise才有then方法】
    return asyncFunc().then((res) => {
      resolve(res)
    }).catch((error) => {
      console.log(`${errMsg}_error:${error}：`)
      resolve(null)
    })
  })
}
