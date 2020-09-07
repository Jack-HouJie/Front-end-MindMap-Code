let http = require('http');

//创建服务
let server = http.createServer(function(request, response){
  //有请求时的回调函数
  //回调函数参数：(请求，响应)

  console.log(request.url);
  if(request.url == '/1.html'){
    response.write('');
    response.end(); 
  }
  // console.log("收到一次请求");
});

//开始等待连接
//参数：端口号
server.listen(8080);