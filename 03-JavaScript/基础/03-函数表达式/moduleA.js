// var SusanModule = (function () {
//   //私有
//   var susan = {
//     // 自由变量
//     name: "susan",
//     sex: "female",
//   };
//   //外部接口（特权方法）
//   return {
//     tell: function () {
//       console.log("im susan");
//     },
//   };
// })();

// 模块模式
(function (window) {
  var name = "susan"
  var sex = "female"
  function tell () {
    console.log("im ", this.name)
  }
  window.susanModule = { tell }
})(window)




