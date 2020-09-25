// 删除多余括号
function func (str) {
  let stack = []
  let result = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ')') {
      if (stack.length === 0) {
        str = str.slice(0, i) + ' ' + str.slice(i + 1)
      } else {
        stack.pop()
      }
    } else if (str[i] === '(') {
      stack.push(i)
    }
  }
  const length = stack.length
  if (length !== 0) {
    for (let i = 0; i < length; i++) {
      str = str.slice(0, i) + str.slice(i + 1)
    }
  }
  return str.split(' ').join('')
}
console.log(func(')09(ds)()))ccc))'))
