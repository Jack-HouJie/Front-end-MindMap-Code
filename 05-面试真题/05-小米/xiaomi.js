// 处理输入
let input = '', line;
while ((line = read_line()) != '') {
  input += line;
}
// 处理输出
const result = Solution(JSON.parse(input));
print(result);


// 算法部分
function Solution (S) {
  if (S[0] === 0) {
    return Infinity
  }
  len = S.length
  let path = []
  let curIdx = 0
  let i = 1
  // for (; curIdx < len; i++) {
  //   let pathMax = S[i]
  //   for (let j = 1; j <= pathMax; j++) {

  //   }
  // }
  return Infinity
}



//2.
// 处理输入
const input = read_line()
const [a, b] = input.split(' ')

// 处理输出
const result = Solution(+a, +b)
print(result)


// 算法部分
function Solution (a, b) {
  let strA = a + ''
  let strB = b + ''
  let aIsFloat = strA.indexOf('.') > -1
  let bIsfloat = strB.indexOf('.') > -1
  if (!aIsFloat && !bIsfloat) {
    return a * b
  }
  else if (aIsFloat && !bIsfloat) {
    let pointNum = strA.length - 1 - strA.indexOf('.')
    let numA = +trim(strA.split('.').join(''))
    let numB = +strB
    return cal(numA, numB, pointNum)
  }
  else if (!aIsFloat && bIsfloat) {
    let pointNum = strB.length - 1 - strB.indexOf('.')
    let numB = +trim(strB.split('.').join(''))
    let numA = +strA
    return cal(numA, numB, pointNum)
  } else {
    let pointNumA = strA.length - 1 - strA.indexOf('.')
    let pointNumB = strB.length - 1 - strB.indexOf('.')
    let pointNum = pointNumA + pointNumB
    let numB = +trim(strB.split('.').join(''))
    let numA = +trim(strB.split('.').join(''))
    return cal(numA, numB, pointNum)
  }
}
function trim (str) {
  let arr = str.split('')
  let i = 0
  let curVal = arr[i]
  while (curVal == 0) {
    arr[i] = ''
    curVal = arr[++i]
  }
  return arr.join('')
}
function cal (numA, numB, pointNum) {
  let result = null
  let strAB = (numA * numB) + ''
  if (strAB.length <= pointNum) {
    let arrAB = strAB.split('')
    let lenAB = arrAB.length
    let resultArr = new Array(pointNum + 2)
    resultArr.fill('0')
    resultArr[1] = '.'
    for (let i = pointNum + 1; i > pointNum + 1 - strAB.length; i--) {
      resultArr[i] = arrAB[lenAB - 1 - (pointNum + 1 - i)]
    }
    result = resultArr.join('')
  }
  else {
    result = strAB.slice(0, strAB.length - pointNum) + '.' + strAB.slice(strAB.length - pointNum)
  }
  return result
}