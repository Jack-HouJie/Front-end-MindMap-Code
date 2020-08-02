// 创建自定义对象
//动态原型模式
function Person (name, age, job) {
  //实例属性
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["liming", "chensen"]
  //共享属性和方法
  if (typeof this.sayName != "function") {
    //此处不能用对象字面量重写原型，会切断联系
    Person.prototype.sayName = function () {
      console.log(this.name)
    }
  }
}


/* 继承 */

//组合继承
function Supertype (name) {
  this.name = name;
  this.color = ["red", "green"];
}
Supertype.prototype.sayName = function () {
  console.log(this.name);
};
function Subtype (name, age) {
  //继承属性
  Supertype.call(this, name);
  //添加属性
  this.age = age;
}
//继承方法
Subtype.prototype = new Supertype();
//添加方法
Subtype.prototype.constructor = Subtype;
Subtype.prototype.sayAge = function () {
  console.log(this.age);
};


//寄生组合继承
function Supertype (name) {
  this.name = name
  this.color = ["red", "green"]
}
Supertype.prototype.sayName = function () {
  console.log(this.name);
}
function Subtype (name, age) {
  // 继承属性
  Supertype.call(this, name)
  // 添加属性
  this.age = age
}
function inheritPrototype (subType, superType) {
  // 创建一个超类型原型的副本
  var prototype = Object(superType.prototype)
  // 补充重写原型丢失的构造函数指针
  prototype.constructor = subType
  // 直接复制原型副本
  subType.prototype = prototype
}
//继承方法
inheritPrototype(Subtype, Supertype)
//添加方法
Subtype.prototype.sayAge = function () {
  console.log(this.age)
}


/* 创建自定义对象 */

// //工厂模式
// function createPerson(name, age, job) {
//   var o = new Object();
//   o.name = name;
//   o.age = age;
//   o.job = job;
//   o.sayName = function () {
//     console.log(this.name);
//   };
//   return o;
// }
// var per1 = createPerson("houjie", 25, "student");
// var per2 = createPerson("houshuai", 35, "doctor");

// //构造函数模式
// function Person(name, age, job) {
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.sayName = sayName;
// }
// function sayName() {
//   console.log(this.name);
// }
// var per1 = new Person("houjie", 25, "student");
// var per2 = new Person("houshuai", 35, "doctor");

// //原型模式-一般
// function Person(){}
// Person.prototype.name = "houjie";
// Person.prototype.age = 25;
// Person.prototype.job = "student";
// Person.prototype.sayName = function(){
//   console.log(this.name);
// }
// var per1 = new Person();
// var per2 = new Person();

// per1.name = "11";
// per2.name = "22";
// delete per1.name;

// per1.sayName();
// per2.sayName();

// //原型模式-对象字面量重写
// function Person(){}
// Person.prototype = {
//   constructor : Person, //可选一，不设置指向Object
//   name : "houjie",
//   age : 25,
//   job : student,
//   sayName : function(){
//     console.log(this.name);
//   }
// };
// //可选二，不设置指向Object且可枚举
// Object.defineProperty(Person.prototype, "constructor",{
//   enumerable : false,
//   value : Person
// });

// //构造函数+原型
// function Person(name, age, job) {
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.friends = ["liming", "chensen"];
// }

// Person.prototype = {
//   constructor: Person,
//   sayName: function () {
//     console.log(this.name);
//   },
// };

// var per1 = new Person("houjie", 25, "student");
// var per2 = new Person("houshuai", 35, "doctor");

// per1.friends.push("yuhao");
// console.log(per1.friends);
// console.log(per2.friends);

// 动态原型（完美）见上

// //寄生构造函数模式
// function Person(name, age, job) {
//   var o = new Object()
//   o.name = name
//   o.age = age
//   o.job = job
//   o.sayName = function () {
//     console.log(this.name)
//   };
//   return o
// }
// var per1 = new Person("houjie", 25, "student");
// var per2 = new Person("houshuai", 35, "doctor");

// //稳妥构造函数模式
// function Person(name, age, job) {
//   var o = new Object();
//   o.sayName = function () {
//     //仅能通过调用此函数得到name
//     console.log(name);
//   };
//   return o;
// }
// var per1 = Person("houjie", 25, "student");




// //原型式继承
// var per = {
//   name: "houjie",
// };
// var anotherPer = Object.create(per, {
//   name: {
//     value: "Greg",
//   },
//   friends: {
//     value: ["liming", "chensen"],
//   },
// });
// console.log(per.name);
// console.log(anotherPer.name);
// console.log(anotherPer.friends);