/**
   * 判断微信设备
   */
function isWx () {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true
  } else {
    return false
  }
}
/**
 * 初始化微信用户
 */
function initWx () {
  let code = ""
  try {
    code = GLOBLE_PARAMS.code
  } catch (e) {
    alert('code捕获异常')
  }
  if (!code || code === "") {
    let url = GLOBLE_PARAMS.debug ? window.location.href.replace(/\?.*!/g, '') + "?debug=true" : window.location.href.replace(/\?.*/g, '')
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f343894d9cce45d&redirect_uri=" + encodeURIComponent(url) + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
  } else {
    $.ajax({
      type: "get",
      dataType: "jsonp",
      data: {
        appId: 'wx1f343894d9cce45d',
        code: code,
        isAuth: true
      },
      url: "https://game.house.163.com/web/user/wx/init2",
      success: function (ret) {
        console.log(ret)
        if (ret.token && ret.token !== "undefined") {
          userinfo = {
            name: ret.nickname,
            headUrl: ret.headUrl,
            token: ret.token
          }
          $.cookie('userinfo', JSON.stringify(userinfo), {
            expires: 1
          })
          initPage()
        }
      }
    })
  }
}
