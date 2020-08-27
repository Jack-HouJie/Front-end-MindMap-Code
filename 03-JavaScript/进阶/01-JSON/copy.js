// // 浅拷贝
// let a = {
//   name: liming
// }
// let b = { ...a }

// 深拷贝



let a = {
  user: {
    name: 'liming',
    age: 23
  }
}

// 局限性：
// 会忽略 undefined
// 不能序列化函数
// 不能解决循环引用的对象
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