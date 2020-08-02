function displayCitations() {
    if(!document.getElementsByTagName)
        return false;
    if(!document.createElement)
        return false;
    if(!document.createTextNode)
        return false;
    //取得所有引用
    var quotes = document.getElementsByTagName("blockquote");
    //遍历引用
    for(var i=0; i<quotes.length; i++){
        //没有cite属性，跳入下次循环
        if(!quotes[i].getAttribute("cite")) {
            continue;
        }
        //保存site
        var url = quotes[i].getAttribute("cite");
        //取得引用所有元素结点
        var quoteChildren = quotes[i].getElementsByTagName("*");

        //没有结点，进入下次循环
        if (quoteChildren < 1) {
            continue;
        } else {
            //找到最后一个元素结点
            var elem = quoteChildren[quoteChildren.length - 1];
        }

        //创建连接标记
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href",url);
        //superscript包装
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        //标记添加到引用的最后一个元素结点
        elem.appendChild(superscript);
    }
}
addLoadEvent(displayCitations);


//displayAccesskeys显示快捷键列表功能实现方法类似