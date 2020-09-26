// 自测
function sum (arr) {
  const length = arr.length
  let result = 0
  for (let i = 0; i < length; i++) {
    result += arr[i]
  }
  return result
}
function test (arr) {
  let length = arr.length
  if (length === 1) {
    if (arr[0] % 7 !== 0) {
      return -1
    } else {
      return arr[0]
    }
  }
  else {
    if (sum(arr) % 7 !== 0) {
      return sum(arr)
    }
    else {
      // 开始索引
      for (let i = 0; i < length; i++) {
        // 删除个数
        for (let j = 0; j < length - 1; j++) {
          return test(arr.splice(i, j))
        }
      }
    }
  }
}

print(test(readline().split(' ')))



// //1.

