/** 实现new
 * https://zhuanlan.zhihu.com/p/84605717
 */
function myNew () {
  /** 1.创建一个新对象
   *  2.将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
   */
  // 取得指定构造函数（第一个参数）
  let constr = Array.prototype.shift.call(arguments)
  // 创建空对象其原型为指定构造函数的原型
  let obj = Object.create(constr.prototype)
  /** 3.为新对象添加属性:
   *  执行构造函数中的代码,
   *  获取返回追 */
  let result = constr.apply(obj, arguments)
  /** 4.如果构造函数有返回值，则返回；
   *  否则，就会默认返回新对象 */
  return result instanceof Object ? result : obj
}

/** 实现instansof
 * @param {Object} left 实例对象 
 * @param {Object} right 构造函数 
 */
function myInstanceof (left, right) {
  let right_prototype = right.prototype
  let left_prototype = left.__proto__
  while (left_prototype) {
    if (left_prototype === right_prototype) {
      return true
    }
    else {
      left_prototype = left_prototype.__proto__
    }
  }
  return false
}