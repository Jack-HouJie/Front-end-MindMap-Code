// // 浅拷贝
let a = {
  name: liming
}
let b = { ...a }

// 深拷贝
// 利用JSON序列化：
// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数
// 不能解决循环引用的对象
// 可使用lodash的深拷贝函数解决
let a = {
  user: {
    name: 'liming',
    age: 23
  }
}
let b = JSON.parse(JSON.stringify(a))
b.user.name = 'zhangsan'
console.log(b.user.name)
console.log(a.user.name)


/** 判断两个JSON相等
 * 
 * @param {Object} json1 
 * @param {Object} json2 
 */

function equalJSON (json1, json2) {
  return JSON.stringify(json1) === JSON.stringify(json2)
}