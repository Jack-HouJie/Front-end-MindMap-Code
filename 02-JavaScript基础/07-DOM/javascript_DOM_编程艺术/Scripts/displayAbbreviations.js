function displayAbbreviations() {
    if(!document.getElementsByTagName)
        return false;
    if(!document.createElement)
        return false;
    if(!document.createTextNode)
        return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if(abbreviations.length < 1)
        return false;
    var defs = new Array();
    //遍历这些缩略词
    for(var i=0; i<abbreviations.length; i++){
        var definition = abbreviations[i].getAttribute("title");
        var key = abbreviations[i].lastChild.nodeValue;
        defs[key] = definition;
    }
    //创建定义列表
    var dlist = document.createElement("dl");
    //遍历定义数组
    for(key in defs){
        //创建定义标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(defs[key]);
        ddesc.appendChild(ddesc_text);
        //添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //创建列表标题
    var dhead = document.createElement("h2");
    var dhead_text = document.createTextNode("Abbreviations List");
    dhead.appendChild(dhead_text);
    //添加到页面主体
    document.body.appendChild(dhead);
    document.body.appendChild(dlist);


}
addLoadEvent(displayAbbreviations);