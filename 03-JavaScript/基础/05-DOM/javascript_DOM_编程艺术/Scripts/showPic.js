//通用型函数
//共享onload事件
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof oldonload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
}
//现有元素后插入新元素
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextElementSibling);
  }
}

//功能函数
//动态创建标记：插入placeholder元素
function preparePlaceholder() {
  if (!document.getElementById) {
    return false;
  }
  if (!document.getElementById("imagegallery")) {
    return false;
  }
  if (!document.createTextNode) {
    return false;
  }
  if (!document.createElement) {
    return false;
  }

  var gallery = document.getElementById("imagegallery");

  var img_plaseholder = document.createElement("img");
  img_plaseholder.setAttribute("id", "placeholder");
  img_plaseholder.setAttribute("src", "images/kongbai.PNG");
  img_plaseholder.setAttribute("alt", "My Image Gallery");

  var element_des = document.createElement("p");
  element_des.setAttribute("id", "description");
  var text_des = document.createTextNode("Choose an image.");
  element_des.appendChild(text_des);

  insertAfter(img_plaseholder, gallery);
  insertAfter(element_des, img_plaseholder);

  // var test = document.createTextNode("Hello world !");
  // ele.appendChild(test);
  // div.appendChild(ele);
}
addLoadEvent(prepareGallery);
//事件处理函数
function prepareGallery() {
  if (!document.getElementsByTagName) {
    return false;
  }
  if (!document.getElementById) {
    return false;
  }
  if (!document.getElementById("imagegallery")) {
    return false;
  }

  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      return !showPic(this);
    };
  }
}
addLoadEvent(preparePlaceholder);
//切换占位符图片至目标图片
function showPic(whichpic) {
  if (!document.getElementById("placeholder")) {
    return false;
  }
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  if (placeholder.nodeName !== "IMG") {
    return false;
  }
  placeholder.setAttribute("src", source);
  if (document.getElementById("description")) {
    if (whichpic.getAttribute("title")) {
      var text = whichpic.getAttribute("title");
    } else {
      var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType === 3) {
      description.firstChild.nodeValue = text;
    }
  }
  return true;
}
