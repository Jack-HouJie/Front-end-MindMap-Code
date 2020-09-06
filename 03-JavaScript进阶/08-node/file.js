const fs = require("fs");
const path = require("path");

// 创建文件夹
fs.mkdir('test',(error)=>{
  console.log(error);
});

// 读文件
fs.readFile('./test/1.txt',(error,data)=>{
  if(error){
    console.log(error);
  }else{
    //data为二进制数据
    console.log(data.toString());
  }
});

//读目录
fs.readdir("./test", (error, list) => {
  if (error) {
    console.log(error);
  } else {
    console.log(list);
    //解析路径文件（第一个文件的名字和扩展名）
    let { name, ext } = path.parse(list[0]);
    console.log(name + ext);
  }
});

// 文件重命名
fs.rename(
  "./test/1.txt", //原名
  "./test/1.md",
  (err) => {
    if (error) console.log(err.code);
  }
);
