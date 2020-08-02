/*特权方法-私有作用域实现*/
(function () {
  //私有变量和函数
  var obj_id = 0; //静态私有变量
  function setOk() {
    console.log("current id : " + obj_id);
    return true;
  }
  //使用匿名函数定义构造函数
  //使用无var变量接收构造函数
  //保证了构造函数可以在私有域外被访问
  Person = function (value) {
    //实例属性
    this.name = value;
  };
  //共享方法(影响所有实例)
  //一般方法
  Person.prototype.sayName = function () {
    console.log(this.name);
  };
  //特权方法
  Person.prototype.setId = function () {
    obj_id = 1;
    return setOk();
  };
})();
var per = new Person();
per.name = "houjie";
per.sayName();
per.setId();

//模块模式
var application = (function () {
  //私有
  var components = new Array();
  //初始化(假设有一基础内容)
  components.push(new BaseComponent());
  //公共
  return {
    getComponentCount: function () {
      return components.length;
    },
    registerComponent: function (component) {
      if (typeof component == "object") {
        components.push(component);
      }
    },
  };
})();

// //增强模块模式
// var application = (function () {
//   //私有
//   var components = new Array();
//   //初始化(假设有一基础内容)
//   components.push(new BaseComponent());
//   //创建指定类型的实例副本
//   var app = new BaseComponent();
//   //公共
//   app.getComponentCount = function () {
//     return components.length;
//   };
//   app.registerComponent = function (component) {
//     if (typeof component == "object") {
//       components.push(component);
//     }
//   };
//   return app;
// })();



// function createFunction(){
//   var result = new Array();
//   for(var i=0; i<10; i++){
//     result[i] = (function(num){
//       return function(){
//         return num;
//       };
//     })(i);
//   }
//   return result;
// }

// for(var res in createFunction()){
//   console.log(res);
// }

// //特权方法-构造函数实现
// function Person() {
//   //公有属性和方法
//   this.name = "";
//   this.getName = function () {
//     console.log(name);
//   };

//   //私有变量和函数
//   var id = 19126282;
//   function getId() {
//     console.log(id);
//   }
//   //特权方法
//   this.publicGetId = function () {
//     return getId();
//   };
// }

// var per = new Person();
// per.publicGetId();