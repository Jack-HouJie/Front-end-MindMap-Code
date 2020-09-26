// 1. 剪刀石头布 JSP

// // let n = parseInt(readline())
// for (let i = 0; i < n; i++) {
//   const arr = readline().split(" ") // [J,S,B,B]
//   let leftPer = 0
//   let rightPer = 0
//   // 计算左手概率
//   if (arr[0] === 'J') {
//     if (arr[2] === 'B' && arr[3] === 'B') {
//       leftPer = 1
//     }
//     else if (arr[2] === 'B' || arr[3] === 'B') {
//       leftPer = 0.5
//     }
//   }
//   else if (arr[0] === 'S') {
//     if (arr[2] === 'J' && arr[3] === 'J') {
//       leftPer = 1
//     }
//     else if (arr[2] === 'J' || arr[3] === 'J') {
//       leftPer = 0.5
//     }
//   }
//   else if (arr[0] === 'B') {
//     if (arr[2] === 'S' && arr[3] === 'S') {
//       leftPer = 1
//     }
//     else if (arr[2] === 'S' || arr[3] === 'S') {
//       leftPer = 0.5
//     }
//   }
//   // 计算右手概率
//   if (arr[1] === 'J') {
//     if (arr[2] === 'B' && arr[3] === 'B') {
//       rightPer = 1
//     }
//     else if (arr[2] === 'B' || arr[3] === 'B') {
//       rightPer = 0.5
//     }
//   }
//   else if (arr[1] === 'S') {
//     if (arr[2] === 'J' && arr[3] === 'J') {
//       rightPer = 1
//     }
//     else if (arr[2] === 'J' || arr[3] === 'J') {
//       rightPer = 0.5
//     }
//   }
//   else if (arr[1] === 'B') {
//     if (arr[2] === 'S' && arr[3] === 'S') {
//       rightPer = 1
//     }
//     else if (arr[2] === 'S' || arr[3] === 'S') {
//       rightPer = 0.5
//     }
//   }

//   if (leftPer > rightPer) {
//     print('left')
//     continue
//   }
//   else if (leftPer < rightPer) {
//     print('right')
//     continue
//   }
//   else if (leftPer === rightPer) {
//     print('same')
//     continue
//   }
// }

// // 2.构造字符串步数
// let length = parseInt(readline())
// let arr = readline().split("")
// // 判断重复出现字符串
// function isRept (strF, strC) {
//   let lengthC = strC.length
//   let result = false
//   // 去除第一次出现
//   let idx = strF.indexOf(strC)
//   if (idx > -1) {
//     strF = strF.slice(idx + lengthC)
//   }
//   // 检查重复出现
//   if (strF.indexOf(strC) > -1) {
//     result = true
//   }
//   return result
// }
// // // 计算最长重复子串长度
// function findTargetStr (arr, length) {
//   // 找到最长重复子串
//   let str = arr.join('')
//   for (let i = length; i > 0; i--) {
//     for (let j = 0; j + i < length + 1; j++) {
//       let curStr = str.slice(j, j + i)
//       if (isRept(str, curStr)) {
//         return curStr.length
//       }
//     }
//   }
// }
// let len = findTargetStr(arr, length)
// print(length - len + 1)


//3.吃红薯

// let n = parseInt(readline())
// for (let i = 0; i < n; i++) {
//   const arr1 = readline().split(" ") // [4,20]
//   const arr2 = readline().split(" ") // [13,14,4,1]
//   let flag = 0
//   for (let i = arr1[0]; i > 0; i--) {
//     let breakFlag = 0
//     for (let j = 0; j + i <= arr1[0]; j++) {
//       let curArr = arr2.slice(j, j + i)
//       let curSum = 0
//       for (let k = 0; k < curArr.length; k++) {
//         curSum += curArr[k]
//       }
//       if (curSum <= arr1[1]) {
//         // print(curArr.length)
//         console.log(curArr.length);
//         flag = 1
//         breakFlag = 1
//         break
//       }
//     }
//     if (breakFlag) {
//       break
//     }
//   }
//   if (!flag) {
//     console.log(0);
//   }
// }




// function test (arr1, arr2) {
//   let flag = 0
//   for (let i = arr1[0]; i > 0; i--) {
//     let breakFlag = 0
//     for (let j = 0; j + i <= arr1[0]; j++) {
//       let curArr = arr2.slice(j, j + i)
//       let curSum = 0
//       for (let k = 0; k < curArr.length; k++) {
//         curSum += curArr[k]
//       }
//       if (curSum <= arr1[1]) {
//         // print(curArr.length)
//         console.log(curArr.length);
//         flag = 1
//         breakFlag = 1
//         break
//       }
//     }
//     if (breakFlag) {
//       break
//     }
//   }
//   if (!flag) {
//     console.log(0);
//   }
// }

// test([3, 8], [1, 4, 3])





// 4.修剪树
let length = parseInt(readline())
let arr = readline().split(" ")
// 判断符合要求
function isMid (arr, idx) {
  let val = arr[idx]
  if (arr[idx - 1] > val && arr[idx + 1] > val) {
    return false
  }
  return true
}
// 数组去重
function unique (arr) {
  return arr.filter(function (item, index, arr) {
    // 只在当前元素第一次出现时为真
    return arr.indexOf(item, 0) === index
  })
}
let arr1 = unique(arr.slice(0).sort())
for (let i = 0; i < arr1.length; i++) {
  let curVal = arr1[i]
  arr.map((item, index) => {
    if (item === curVal && isMid(arr, index)) {
      if (arr[index - 1] < arr[index + 1]) {
        arr[index - 1] = arr[index]
      } else {
        arr[index + 1] = arr[index]
      }
    }
  })
}
print(arr)


