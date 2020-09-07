// 1.创建koa对象
const Koa = require('koa')
const app = new Koa()
// 2.设置中间件
/**
 * @param {} ctx 上下文/Web容器：
 * ctx.request ctx.response
 * @param {} next 下一个中间件的调用函数
 */
// 第一层中间件
app.use(async (ctx, next) => {
  console.log('首次进入第一层中间件')
  ctx.response.body = 'hello world!'
  // let ret = next() // 把内层的return值包装成Promise，
  // console.log(ret)
  let ret = await next()
  console.log(ret) // 可以通过await直接拿到Promise中的值
  
  console.log('再次进入第一层中间件')
})
// 第二层中间件
app.use((ctx, next) => {
  console.log('首次进入第二层中间件')
  ctx.response.body = 'hello world!'
  next()
  console.log('再次进入第二层中间件')
  return 'test'
})
// 第三层中间件
app.use((ctx, next) => {
  console.log('首次进入第三层中间件')
  ctx.response.body = 'hello world!'
  console.log('再次进入第三层中间件')
})
// 3.绑定端口号
app.listen(3000)
