function Super (name, age) {
  this.name = name
  this.age = age
  if (typeof this.sayName !== "function") {
    Super.prototype.sayName = function () {
      console.log(this.name);
    }
  }
}
function Sub (name, age, school) {
  Super.call(this, name, age)
  this.school = school
}
function inheritPrototype (subTpye, superType) {
  let prototype = Object(superType.prototype)
  prototype.constructor = subTpye
  subTpye.prototype = prototype
}
inheritPrototype(Sub, Super)
Sub.prototype.saySchool = function () {
  console.log(this.school);
}

let name_age = new Super("zhangsan" , 14)
name_age.sayName()
name_age.saySchool()

let name_age_school = new Sub("liming", 14, "BJTU")
name_age_school.sayName()
name_age_school.saySchool()