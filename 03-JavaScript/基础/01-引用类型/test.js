Function.prototype.myCall = function (ctx) {
  ctx.func = this
  const args = [...arguments].slice(1)
  const result = ctx.func(args)
  delete ctx.func
  return result
}

Function.prototype.myApply = function (ctx) {
  ctx.func = this
  let result = null
  if (arguments[1]) {
    const args = [...arguments[1]]
    result = ctx.func(args)
  }
  else {
    result = ctx.func()
  }
  delete ctx.func
  return result
}

Function.prototype.myBind = function (ctx) {
  let _this = this
  const args = [...arguments].slice(1)
  return function F () {
    // 如果bind返回的函数通过new调用*
    if (this instanceof F) {
      // 返回一个函数实例
      return new _this(...args, ...arguments)
    }
    else {
      return _this.myApply(ctx, args.concat(...arguments))
    }
  }
}

// const q_str = location.search
const q_str = 'name=zhangsan&age=14&school=s1&school=s2&student'
/**
 * 传入一个查询字符串，
 * 存储于map数据结构并返回，
 * 多个相同name的value保存为数组，
 * name无value保存为true
 * @param {String}} str 
 */
function getQueryString (str) {
  let query_map = {}
  const items = str.length > 0 ? str.split("&") : []
  for (let index in items) {
    let item, name, value
    item = items[index].split("=")
    name = decodeURIComponent(item[0])
    if (item[1]) {
      value = decodeURIComponent(item[1])
      if (query_map[name]) {
        query_map[name] = [].concat(query_map[name], `${value}`)
      } else {
        query_map[name] = value
      }
    } else {
      value = true
      query_map[name] = value
    }
  }
  return query_map
}

console.log(getQueryString(q_str));