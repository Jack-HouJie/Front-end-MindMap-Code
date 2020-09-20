/** 实现new
 * https://zhuanlan.zhihu.com/p/84605717
 */
function myNew () {
  // 0.取得指定构造函数（第一个参数）
  let constructor = Array.prototype.shift.call(arguments)
  /* 1.创建一个新对象并实现继承（继承方法）  */
  let obj = Object.create(constructor.prototype)
  /* 2.对象上根据参数执行构造函数（添加实例属性）*/
  let result = constructor.apply(obj, arguments)
  /* 3.返回结果：构造函数返回值 || 创建的新对象 */
  return result instanceof Object ? result : obj
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


// 创建属性
var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});

// 对象 o 拥有了属性 a，值为 37

// 在对象中添加一个设置了存取描述符属性的示例
var bValue = 38;
Object.defineProperty(o, "b", {
  // 使用了方法名称缩写（ES2015 特性）
  // 下面两个缩写等价于：
  // get : function() { return bValue; },
  // set : function(newValue) { bValue = newValue; },
  get () {
    return bValue;
  },
  set (newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true
});

o.b; // 38
// 对象 o 拥有了属性 b，值为 38
// 现在，除非重新定义 o.b，o.b 的值总是与 bValue 相同

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102,
  get () {
    return 0xdeadbeef;
  }
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors