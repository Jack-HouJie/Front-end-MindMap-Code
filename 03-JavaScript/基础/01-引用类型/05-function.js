/** 实现call
 * 
 * @param {Object} ctx
 * @param {*} argument 多个参数  
 */
Function.prototype.myCall = function (ctx) {
  // 在执行环境创建临时方法
  ctx.func = this
  // 截取参数(第一项之后)
  const args = [...arguments].slice(1)
  // 得到结果
  const result = ctx.func(args)
  // 删除方法
  delete ctx.func
  // 返回结果
  return result
}

/** 实现apply
 * 
 * @param {Object} ctx
 * @param {Array} arguments 执行的参数（可选）
 */
Function.prototype.myApply = function (ctx) {
  // 执行环境中创建临时函数
  ctx.func = this
  // 判断是否有参数*
  let result = null
  if (arguments[1]) {
    // 得到结果
    result = ctx.func(...arguments[1])
  } else {
    // 得到结果
    result = ctx.func()
  }
  // 删除方法
  delete ctx.func
  // 返回结果
  return result
}

/** 实现bind
 * 
 * @param {Object} ctx 
 * @param {Array} arguments 执行的参数（可选）
 */
Function.prototype.myBind = function (ctx) {
  // this指向函数对象
  const _this = this
  // 得到参数
  const args = [...arguments].slice(1)
  // 返回一个函数(闭包)：
  // 1.实现持有ctx，在被调用时使用
  // 2.实现柯里化，可以在F被调用时实现参数复用并添加额外参数
  return function F () {
    // 如果通过new调用返回的函数
    // this应指向 new 赋给的变量
    // (其是bindFun的实例，也就是F的实例)
    if (this instanceof F) {
      // 通过new Function()实现：
      // （此时不实现绑定ctx）
      // 2.参数复用并补充参数
      return new _this(...args, ...arguments)
    }
    // 如果直接调用
    // 则通过apply实现：
    // 1.绑定ctx
    // 2.参数复用并补充参数
    return _this.myApply(ctx, args.concat(...arguments))
  }
}

let obj = {
  name: ''
}

function getName (name, age) {
  this.name = name
  this.age = age
  return this.name + ',' + this.age
}

let bindFun = getName.myBind(obj, 'Jack')

console.log(bindFun('12'))
console.log(bindFun('13'))
console.log(bindFun('15'))

let bindFun_new = new bindFun('14')
console.log(bindFun_new)