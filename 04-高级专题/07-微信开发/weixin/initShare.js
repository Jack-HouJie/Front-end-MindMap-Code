// old
function initWeixinShare () {
  //分享
	/*var WeiXinConfig = {
		"imgUrl":shareObj.img,
		"link": curUrl,
		"desc": shareInfo.desc,
		"title": shareInfo.title,
	};*/
  WeixinApi.ready(function (Api) {
    // 微信分享的数据
    var wxData = WeiXinConfig;
    var wxData1 = {
      "imgUrl": WeiXinConfig.imgUrl,
      "link": curUrl,
      "desc": WeiXinConfig.title,
      "title": WeiXinConfig.title,
    };
    // 分享的回调
    var wxCallbacks = {
      // 收藏操作不执行回调，默认是开启(true)的
      favorite: false,
      async: true,
      // 分享操作开始之前
      ready: function () {
      },
      // 分享被用户自动取消
      cancel: function (resp) {
        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
      },
      // 分享失败了
      fail: function (resp) {
        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
      },
      // 分享成功
      confirm: function (resp) {
        // 分享成功了，我们是不是可以做一些分享统计呢？

      },
      // 整个分享过程结束
      all: function (resp, shareTo) {
        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
        $.ajax({
          url: INIT_URL.domain + INIT_URL.share,
          type: 'get',
          dataType: "jsonp",
          data: {
            id: GLOBLE_ACTION_ID
          },
          success: function (databack) {
            alert("分享成功！")
            //window.location.reload()
            window.location.href = "http://m.house.163.com/fps/frontends/house_special_2019/baoli/baoli.html?id=1105"
          },
          error: function (databack) {

          }
        });
        //window.shareSuccess();
      }
    };
    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);
    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData1, wxCallbacks);
    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);
    // iOS上，可以直接调用这个API进行分享，一句话搞定
    //Api.generalShare(wxData, wxCallbacks);
  });
}

// newsapp-share
