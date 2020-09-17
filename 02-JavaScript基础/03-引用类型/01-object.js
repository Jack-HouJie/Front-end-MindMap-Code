/** 实现new
 * https://zhuanlan.zhihu.com/p/84605717
 */
function myNew () {
  /* 1.创建一个新对象为构造函数的原型（继承属性和方法）  */
  // 取得指定构造函数（第一个参数）
  let constructor = Array.prototype.shift.call(arguments)
  // 创建空对象其原型为指定构造函数的原型
  let obj = Object.create(constructor.prototype)
  /* 2.对象上执行构造函数（添加实例属性）*/
  let result = constructor.apply(obj, arguments)
  /* 3.使用构造函数返回值或创建的新对象作为创建的实例对象返回 */
  return result instanceof Object ? result : obj
}

/** 实现instansof
 * @param {Object} left 实例对象 
 * @param {Object} right 构造函数 
 */
function myInstanceof (left, right) {
  // 构造函数原型
  let rightPrototype = right.prototype
  // 实例对象原型
  let leftPrototype = left.__proto__
  while (leftPrototype) {
    if (leftPrototype === rightPrototype) {
      return true
    }
    else {
      // 沿原型链查找
      leftPrototype = leftPrototype.__proto__
    }
  }
  return false
}

// 实现 Object对象基础方法： 克隆值
// 复制调用此基础方法的对象的值
// 支持的类型；Number、String、Object、Array、Boolean
Object.prototype.myClone = function () {
  let result
  if (Array.isArray(this)) {
    result = []
    for (let i = 0; i < this.length; i++) {
      result.push(this[i])
    }
  }
  else if (typeof this == 'object') {
    result = JSON.parse(JSON.stringify(this))
  }
  else {
    result = this
  }
  return result
}
let num = 29489248
console.log(num.myClone())
console.log('123'.myClone())
console.log({ a: 1, child: { b: 2 } }.myClone())
console.log([123, 456].myClone())
console.log(true.myClone())
