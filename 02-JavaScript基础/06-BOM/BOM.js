/** 处理查询字符串
 * 
 */
function getQueryString () {
  // 判断是否存在*，通过BOM得到查询字符串*
  // const q_str = location.search.length > 0 ? location.search.slice(1) : ''
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
  console.log(map)
  return map
}
// const q_str = location.search
const q_str = 'name=zhangsan&age=14&school=s1&school=s2&student'
getQueryString()

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

// 超时调用实现间歇调用
function myInterval () {
  var num = 0;
  var max = 10;
  function incrementNum () {
    num++;
    if (num < max) {
      setTimeout(incrementNum, 500);
    } else {
      console.log("done");
    }
  }
  setTimeout(incrementNum, 500);
}

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

/** 检测浏览器插件
 * 
 * @param {String} name 
 */
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




