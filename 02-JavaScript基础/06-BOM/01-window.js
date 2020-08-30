// 配置浏览器窗口
function setView () {
  // 获得窗口位置
  var leftPos =
    typeof window.screenLeft == "number" ? window.screenLeft : window.screenX;
  var topPos =
    typeof window.screenTop == "number" ? window.screenTop : window.screenY;

  console.log(leftPos);
  console.log(topPos);
  // 移动窗口位置
  window.moveTo(200, 200);
  // 获得视口大小
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
  //改变窗口大小
  window.resizeTo(100, 500);
}

/** 超时调用实现间歇调用
 * 
 */
function exec () {
  curNum++
  console.log(curNum) // 每次调用的操作
  if (curNum < maxNum) {
    setTimeout(exec, 1000)
  } else {
  }
}
let curNum = 0
let maxNum = 10
setTimeout(exec, 100)

// 设置系统对话框
function setLog () {
  //对话框
  if (confirm("is ok ?")) {
    console.log("is ok");
  } else {
    console.log("is not ok");
  }

  var username = prompt("Hi,who are you?", "enter your name here");
  if (username) {
    console.log("welcome !" + username + "!");
  }

}