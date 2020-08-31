// 实现call
Function.prototype.myCall = function (ctx) {
  // 在执行环境创建临时方法
  ctx.func = this
  // 截取参数(第二项之后)、用const因为不变
  const args = [...arguments].slice(1)
  // 得到结果
  const result = ctx.func(...args)
  // 临时函数解引用 delete删除方法
  delete ctx.func
  return result
}

// 实现apply
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

// 实现bind
Function.prototype.myBind = function (ctx) {
  // 保存要绑定的函数
  const _this = this
  // 得到参数
  const args = [...arguments].slice(1)
  // 返回一个函数(闭包)：
  // 1.实现持有ctx，在被调用时使用
  // 2.实现柯里化，可以在F被调用时添加额外参数
  return function F () {
    // 如果返回的函数通过new调用
    // this应指向new 赋给的变量：bindFun的实例，也就是F的实例
    if (this instanceof F) {
      // 此时不实现绑定ctx，
      // 只实现柯里化
      return new _this(...args, ...arguments)
    }
    // 如果直接调用，则通过apply实现绑定ctx
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

let bindFun = getName.myBind(obj, 'lisi')

console.log(bindFun('12'))
console.log(bindFun('13'))
console.log(bindFun('15'))

let bindFun_new = new bindFun('14')
console.log(bindFun_new)