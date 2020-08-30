function getNewContent() {
    var request = getHTTPObject();
    if(request){
        //GET形式请求，文件example.txt，是异步发送
        request.open("GET","example.txt",true);
        request.onreadystatechange =function () {
            if(request.readyState === 4){
                var para = document.createElement("p");
                var text = document.createTextNode(request.responseText);
                para.appendChild(text);
                var line = document.getElementById("Ajax_test");
                line.appendChild(para);
            }
        };
        request.send(null);
    }
    else{
        alert("Sorry, the browser does not support XMLHttpRequest");
    }
}
addLoadEvent(getNewContent);