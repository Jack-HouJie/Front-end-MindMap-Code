/** 点击列表项得到索引
 * <ul id=”test”>
 *  <li>这是第一条</li>
 *  <li>这是第二条</li>
 *  <li>这是第三条</li>
 * </ul>
 */
function getIdx () {
  let lis = document.querySelectorAll('ul li')
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
      console.log(i);
    })
  }
}
getIdx()

/* 变量深浅拷贝 */
{
  let originObj = { a: 'a', b: 'b', c: [1, 2, 3], d: { dd: 'dd' } };
  // let originObj = [1, 2, 3, [1, 2, 3]]
  // 1.1浅拷贝展开运算符实现
  // let cloneObj = { ...originObj }

  // 1.2浅拷贝assign()实现
  // let cloneObj = Object.assign({}, originObj)

  // 2.1深拷贝JSON序列化实现
  // let cloneObj = JSON.parse(JSON.stringify(originObj))

  // 2.2深拷贝递归实现
  function deepClone (source) {
    // 判断复制的目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {}
    // 枚举对象属性（包括原型上的属性）
    for (let keys in source) {
      // 过滤出对象本身的属性
      if (source.hasOwnProperty(keys)) {
        // 如果属性值是对象，则递归处理
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = deepClone(source[keys])
        }
        // 如果不是，就直接赋值
        else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  }

  let cloneObj = deepClone(originObj);
  console.log(cloneObj === originObj); // false

  cloneObj.a = 'aa';
  cloneObj.c = [1, 1, 1];
  cloneObj.d.dd = 'doubled';

  console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};
  console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'}};


  // 深拷贝
  // 利用JSON序列化：
  // 会忽略 undefined
  // 会忽略 symbol
  // 不能序列化函数
  // 不能解决循环引用的对象
  // 可使用lodash的深拷贝函数解决
  // let a = {
  //   user: {
  //     name: 'liming',
  //     age: 23
  //   }
  // }
  // let b = JSON.parse(JSON.stringify(a))
  // b.user.name = 'zhangsan'
  // console.log(b.user.name)
  // console.log(a.user.name)
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