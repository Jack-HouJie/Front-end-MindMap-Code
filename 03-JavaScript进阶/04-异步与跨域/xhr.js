// xhr发送XML
//用户名校验的方法
//使用XMLHTTPRequest对象来进行AJAX的异步数据交互
let xmlhttp;
function verify () {
  let userName = document.getElementById("userName").value;
  //1.创建XMLHttpRequest对象
  //这是XMLHttpReuquest对象五步使用中最复杂的一步
  //需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码
  if (window.XMLHttpRequest) {
    //针对FireFox，Mozillar，Opera，Safari，IE7，IE8
    xmlhttp = new XMLHttpRequest();
    //针对某些特定版本的mozillar浏览器的BUG进行修正
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType("text/xml");
    }
  } else if (window.ActiveXObject) {
    //针对IE6，IE5.5，IE5
    //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
    //排在前面的版本较新
    const activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    for (let i = 0; i < activexName.length; i++) {
      try {
        //取出一个控件名进行创建，如果创建成功就终止循环
        //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
        xmlhttp = new ActiveXObject(activexName[i]);
        break;
      } catch (e) {
      }
    }
  }
  //确认XMLHTtpRequest对象创建成功
  if (!xmlhttp) {
    console.log("XMLHttpRequest对象创建失败!!")
    return
  } else {
    console.log('xml状态' + xmlhttp.readyState)
  }

  //2.注册回调函数
  //注册回调函数时，之需要函数名，不要加括号
  //我们需要将函数名注册，如果加上括号，就会把函数的返回值注册上，这是错误的
  xmlhttp.onreadystatechange = callback;

  //3。设置连接信息
  //第一个参数表示http的请求方式，支持所有http的请求方式，主要使用get和post
  //第二个参数表示请求的url地址，get方式请求的参数也在url中
  //第三个参数表示采用异步还是同步方式交互，true表示异步
  //xmlhttp.open("GET","servlet/ajaxXmlServer?name="+ userName,true);
  //POST方式请求的代码
  xmlhttp.open("POST", "servlet/ajaxXmlServer", true);
  //POST方式需要自己设置http的请求头
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  //POST方式发送数据
  xmlhttp.send("name=" + userName);

  //4.发送数据，开始和服务器端进行交互
  //同步方式下，send这句话会在服务器段数据回来后才执行完
  //异步方式下，send这句话会立即完成执行
  //xmlhttp.send(null);
}

//回调函数
function callback () {
  //alert(xmlhttp.readyState);
  //5。接收响应数据
  //判断对象的状态是交互完成
  if (xmlhttp.readyState == 4) {
    //判断http的交互是否成功
    if (xmlhttp.status == 200) {
      //使用responseXML的方式来接收XML数据对象的DOM对象
      var domObj = xmlhttp.responseXML;
      if (domObj) {
        //<message>123123123</message>
        //dom中利用getElementsByTagName可以根据标签名来获取元素节点，返回的是一个数组
        var messageNodes = domObj.getElementsByTagName("message");
        if (messageNodes.length > 0) {
          //获取message节点中的文本内容
          //message标签中的文本在dom中是message标签所对应的元素节点的字节点，firstChild可以获取到当前节点的第一个子节点
          //通过以下方式就可以获取到文本内容所对应的节点
          var textNode = messageNodes[0].firstChild;
          //对于文本节点来说，可以通过nodeValue的方式返回文本节点的文本内容
          var responseMessage = textNode.nodeValue;

          //将数据显示在页面上
          //通过dom的方式找到div标签所对应的元素节点
          var divNode = document.getElementById("result");
          //设置元素节点中的html内容
          divNode.innerHTML = responseMessage;
        } else {
          alert("XML数据格式错误，原始文本内容为：" + xmlhttp.responseText);
        }
      } else {
        alert("XML数据格式错误，原始文本内容为：" + xmlhttp.responseText);
      }
    } else {
      alert("出错了！！！");
    }
  }
}