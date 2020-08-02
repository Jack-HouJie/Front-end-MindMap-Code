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

let b = JSON.parse(JSON.stringify(a))

b.user.name = 'zhangsan'
console.log(b.user.name)
console.log(a.user.name)