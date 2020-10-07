// 合并重叠区间
// 时间限制： 3000MS
// 内存限制： 589824KB
// 题目描述：
// 合并重叠区间。

// 例如:

// 输入: 

// 1 3

// 8 10

// 2 6

// 15 18

// 输出: 

// 1 6

// 8 10

// 15 18

// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]；合并后的区间[1, 6]与区间[8, 10]和[15, 18]相互不重叠，直接输出

// let curItem = read_line().split(' ')
// const input = []
// while (curItem[1]) {
//   if (curItem[0] < curItem[1]) {
//     input.push(curItem)
//   }
//   curItem = read_line().split(' ')
// }

// function func (input) {
//   const length = input.length
//   if (length <= 1) {
//     print(input)
//     // console.log(input)
//     return
//   }
//   // 按值从小到大排序
//   input.sort((a, b) => a[0] - b[0])
//   let start = input[0][0]
//   let end = input[0][1]
//   const result = [[start, end]]
//   for (let i = 1; i < length; i++) {
//     // 如果后一项开始比前一项结束小
//     if (input[i][0] < end) {
//       // 如果后一项结束比前一项结束大
//       if (input[i][1] > end) {
//         // 更新当前结束
//         end = input[i][1]
//         // 更新结果
//         result.pop()
//         result.push([start, end])
//       }
//     } else {
//       // 更新当前开始结束
//       start = input[i][0]
//       end = input[i][1]
//       // 增加一条结果
//       result.push([start, end])
//     }
//   }
//   for (let i = 0; i < result.length; i++) {
//     print(result[i][0] + ' ' + result[i][1])
//     // console.log(result[i][0] + ' ' + result[i][1]);
//   }
// }
// // func([[1, 2], [5, 6], [1.5, 4]])
// func(input)


const strCN = read_line()
function func (strCN) {
  let str = strCN.split('零').join('')
  const length = str.length
  if (length === 0) {
    return
  }
  const cnToNum = {
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '七': 7,
    '八': 8,
    '九': 9
  }
  if (length === 1) {
    return cnToNum[str[0]]
  }
  const cnToWei = {
    '十': 10,
    '百': 100,
    '千': 1000,
    '万': 10000,
    '亿': 100000000
  }
  let preNum = cnToNum[str[0]] * cnToWei[str[1]]
  let result = preNum // 保存 [n亿,n万,n百,n十,n]
  let curIdx = 2
  while (cnToNum[str[curIdx]]) {
    // 当前数字
    let curNum
    if (cnToWei[str[i + 1]]) {
      curNum = cnToNum[str[i]] * cnToWei[str[i + 1]]
      curIdx += 2
    }
    else if (cnToWei[str[i + 1]] && cnToWei[str[i + 2]]) {
      curNum = (cnToNum[str[i]] * cnToWei[str[i + 1]]) * cnToWei[str[i + 2]]
      curIdx += 3
    }
    else {
      curNum = cnToNum[str[i]]
    }
    if (curNum > preNum) {
      preNum = (cnToNum[str[i]] + preNum) * cnToWei[str[i + 1]]
      result = preNum
    } else {
      result = preNum + curNum
      preNum = result
    }
  }
  // console.log(result);
  print(result)
}
func(strCN)
