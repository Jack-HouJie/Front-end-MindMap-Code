// 已知开始和终止时间，安排会议
// 输入数组：[{start:9,end:10},{start:10,end:11},{start:9.5,end:12},{start:9,end:11.5},{start:11,end:12},{start:14.5,end:16},{start:17,end:18},{start:19.5,end:21},{start:19,end:20}]
// 输出数组：[{start:9,end:10},{start:10,end:11},{start:11,end:12},{start:14.5,end:16},{start:17,end:18}，{start:19,end:20}]
function func (arr) {
  arr.sort((a, b) => a.start - b.start)
  const length = arr.length
  let end = arr[0].end
  let result = [arr[0]]
  for (let i = 1; i < length; i++) {
    if (arr[i].start > end) {
      result.push(arr[i])
      end = arr[i].end
    }
  }
  return result
}
console.log(func([{ start: 9, end: 10 }, { start: 10, end: 11 }, { start: 9.5, end: 12 }, { start: 9, end: 11.5 }, { start: 11, end: 12 }, { start: 14.5, end: 16 }, { start: 17, end: 18 }, { start: 19.5, end: 21 }, { start: 19, end: 20 }]));