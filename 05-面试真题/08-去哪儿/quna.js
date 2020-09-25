// 删除数组中最多数字
// let arr = read_line().split(',')
function func1 (arr) {
  const length = arr.length
  let map = {}
  let max = 1
  let tar = arr[0]
  for (let i = 1; i < length; i++) {
    const curNum = arr[i]
    if (!map[curNum]) {
      map[curNum] = 1
    } else {
      map[curNum] = map[curNum] + 1
    }
    if (map[curNum] > max) {
      max = map[curNum]
      tar = curNum
    }
  }
  let result = []
  for (let i = 0; i < length; i++) {
    if (arr[i] != tar) {
      result.push(arr[i])
    }
  }
  return result.join(',')
}

console.log(func1([1, 2, 3, 3, 4]))