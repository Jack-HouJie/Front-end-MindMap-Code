window.moveTo(200, 200);

var leftPos =
  typeof window.screenLeft == "number" ? window.screenLeft : window.screenX;
var topPos =
  typeof window.screenTop == "number" ? window.screenTop : window.screenY;

console.log(leftPos);
console.log(topPos);

//取得视口大小
var pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}

// //改变窗口大小
// window.resizeTo(100,500);

// //超时调用实现间歇调用
// var num = 0;
// var max = 10;
// function incrementNum(){
//   num++;
//   if(num < max){
//     setTimeout(incrementNum,500);
//   }else{
//     console.log("done");
//   }
// }
// setTimeout(incrementNum,500);

// //对话框
// if(confirm("is ok ?")){
//   console.log("is ok");
// }else{
//   console.log("is not ok");
// }

// var username = prompt("Hi,who are you?", "enter your name here");
// if (username) {
//   console.log("welcome !" + username + "!");
// }

// //解析查询字符串
// function getQueryStringArgs() {
//   //取得查询字符串并去掉开头问号
//   var qs = location.search.length > 0 ? location.search.substring(1) : "";
//   //保存数据的对象
//   args = {};
//   //取得每一项
//   items = qs.length ? qs.split("&") : [];
//   //声明用到的参数
//   item = null;
//   name = null;
//   value = null;
//   i = 0;
//   len = items.length;
//   for (i = 0; i < len; i++) {
//     item = items[i].split("=");
//     name = decodeURIComponent(item[0]);
//     value = decodeURIComponent(item[1]);
//     if (name.length) {
//       args[name] = value;
//     }
//   }
//   return args;
// }

// 检测浏览器插件
function hasPlugin (name) {
  name = name.toLowerCase();
  plu = navigator.plugins;
  plu_len = plu.length;
  for (var i = 0; i < plu_len; i++) {
    if (plu[i].name.toLowerCase.indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}

