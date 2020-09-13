let originObj = { a: 'a', b: 'b', c: [1, 2, 3], d: { dd: 'dd' } };
// 1.1浅拷贝展开运算符实现
// let cloneObj = { ...originObj }

// 1.2浅拷贝assign()实现
// let cloneObj = Object.assign({}, originObj)

// 2.1深拷贝JSON序列化实现
// let cloneObj = JSON.parse(JSON.stringify(originObj))

// 2.2深拷贝递归实现
function deepClone (source) {
  // 判断复制的目标是数组还是对象
  const targetObj = source.constructor === Array ? [] : {};
  // 遍历目标
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      // 如果值是对象，就递归一下
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }
      // 如果不是，就直接赋值
      else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

let cloneObj = deepClone(originObj);
console.log(cloneObj === originObj); // false

cloneObj.a = 'aa';
cloneObj.c = [1, 1, 1];
cloneObj.d.dd = 'doubled';

console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'}};
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};



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


/** 判断两个JSON相等
 * 
 * @param {Object} json1 
 * @param {Object} json2 
 */

function equalJSON (json1, json2) {
  return JSON.stringify(json1) === JSON.stringify(json2)
}