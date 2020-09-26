// 1.质数相乘
// const n = read_line()
// function func1 (n) {
//   const z = []
//   for (let i = 2; i < n; i++) {
//     if (isZ(i)) {
//       z.push(i)
//     }
//   }
//   let result = []
//   addNum(n, z, result)
//   return `${n}=` + result.join('*')
// }
// function addNum (num, arr, result) {
//   for (let i = 0; i < arr.length; i++) {
//     if (num % arr[i] === 0) {
//       result.push(arr[i])
//       addNum(num / arr[i], arr, result)
//       return
//     }
//   }
//   if (num === 1) {
//     return
//   } else {
//     result.pop()
//   }
// }
// function isZ (x) {
//   if (x < 2) {
//     return false
//   }
//   if (x === 2) {
//     return true
//   }
//   for (let i = 2; i < x; i++) {
//     if (x % i === 0) {
//       return false
//     }
//   }
//   return true
// }
// function c (arr) {
//   let result = 1
//   for (let i = 0; i < arr.length; i++) {
//     result *= arr[i]
//   }
//   return result
// }
// print(func1(n));






// 2.反转字符串元音
const str = read_line()
function func2 (str) {
  let result = []
  let yIdx = []
  let yChar = []
  for (let i = 0; i < str.length; i++) {
    if (isY(str[i])) {
      yIdx.push(i)
      yChar.push(str[i])
    } else {
      result[i] = str[i]
    }
  }
  let yStr = ''
  for (let idx in yChar) {
    yStr += yChar[idx]
  }
  let yRevArr = reverseToArr(yStr)
  // 写回
  for (let idx in yIdx) {
    result[yIdx[idx]] = yRevArr.shift()
  }
  return result.join('')
}
function reverseToArr (str) {
  return str.split('').reverse()
}
function isY (char) {
  if (char.match(/[aeiouAEIOU]/) !== null) {
    return true
  }
  return false
}
// console.log(func2('lenovo'));
print(func2(str))
