let play = true;
let flag = false;
Bgm = $("#Bgm")[0]
$Music = $(".music")
// if(window.innerHeight > 1206){
//   $Music.css("top",""+)
// }
$Music.on("click", function () {
  if (play) {
    Bgm.pause()
    $Music.removeClass('play').addClass('pause')
    play = false
  } else {
    Bgm.play()
    $Music.removeClass('pause').addClass('play')
    play = true
  }
})
document.addEventListener("WeixinJSBridgeReady", function () {
  WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
    Bgm.play()
    $Music.removeClass('pause').addClass('play')
    play = true
  })
}, false)