// 数组去重
function unique (arr) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item, 0) === index
  })
}
// 数组展开
function fun (arr) {
  // toString()是一个方法*
  return arr.toString().split(',')
}
// 判断回文
function isReverseStr (str) {
  return str.split('').reverse().join('') === str
}


// 处理查询字符串
function getQueryString () {
  // 判断是否存在*，通过BOM得到查询字符串*
  // const q_str = location.search.length > 0 ? location.search.slice(1) : ''
  q_str = 'name=zhangsan&age=14&school=s1&student'
  const items = q_str.length > 0 ? q_str.split('&') : []
  const length = items.length
  let map = {}
  for (let i = 0; i < length; i++) {
    // 每项是一个数组*
    let item = items[i].split('=')
    // 进行URI解码
    let name = decodeURIComponent(item[0])
    if (item[1]) {
      let value = decodeURIComponent(item[1])
      if (map[name]) {
        // 第二次后变为数组
        map[name] = [].concat(map[name], `${value}`)
      } else {
        map[name] = value
      }
    } else {
      map[name] = true
    }
  }
  // console.log(map)
  return map
}
getQueryString()

// 模块模式 传入window*
