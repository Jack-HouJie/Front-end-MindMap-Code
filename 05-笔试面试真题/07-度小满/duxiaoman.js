// // 1.已有一些颜色，求目标颜色可画的数量
// const curArr = read_line().split('')
// const curArrLen = curArr.length
// const curCount = []
// const tarArr = read_line().split('')
// const tarArrLen = tarArr.length

// function test1 () {
//   for (let i = 0; i < curArrLen; i++) {
//     let curChar = curArr[i]
//     if (!curCount[curChar]) {
//       curCount[curChar] = 1
//     } else {
//       curCount[curChar] = curCount[curChar] + 1
//     }
//   }
//   let result = 0
//   for (let i = 0; i < tarArrLen; i++) {
//     let curChar = tarArr[i]
//     if (curCount[curChar] === 0 || !curCount[curChar]) {
//       curCount[curChar] = -1
//     } else {
//       result++
//       curCount[curChar] = curCount[curChar] - 1
//     }
//   }
//   print(result)
// }
// test1()

//2. 长度为3的子数组相似（只存在一个不同的项）
// const n = parseInt(readline())
// let arrs = []
// for (let i = 0; i < n; i++) {
//   lines = readline().split("")
//   arrs.push(lines)
// }
// let len = arrs.length
// for (let i = 0; i < len; i++) {
//   test2(arrs[i])
// }
function test2 (arr) {
  let len = arr.length
  if (len % 3 !== 0) {
    print('No')
    // console.log('No' + '（长度错误）');
    return
  }
  let items = []
  for (let i = 0; i < arr.length; i += 3) {
    let item = arr.slice(i, i + 3)
    items.push(item)
  }

  // 判断每个item
  let len1 = items.length
  for (let i = 1; i < len1; i++) {
    for (let j = 0; j < i; j++) {
      // console.log('两个item:' + items[i] + '和' + items[j]);
      if (!test3(items[i], items[j])) {
        print('No')
        // console.log('No' + '（出现不相似）');
        return
      }
    }
  }
  print('Yes')
  // console.log('Yes');
}
// // 判断两个数组相似
function test3 (arr1, arr2) {
  let flag1 = arr1[0] === arr2[0] &&  arr1[1] === arr2[1]
  let flag2 = arr1[0] === arr2[0] &&  arr1[2] === arr2[2]
  let flag3 = arr1[2] === arr2[2] &&  arr1[1] === arr2[1]
  return flag1 || flag2 || flag3
}

test2([1, 3, 3, 1, 2, 4,5]);
