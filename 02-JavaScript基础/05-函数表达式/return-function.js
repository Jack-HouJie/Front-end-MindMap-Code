var add = function (x) {
  var sum = 1
  var tmp = function (x) {
    sum = sum + x
    return tmp
  }
  tmp.toString = function () {
    return sum
  }
  return tmp
}
// console.log(+add(1)(2)(3))

function create1 (pro) {
  console.log("pro : " + pro);
  return function (obj1, obj2) {
    console.log(obj1 + " -- " + obj2)
    return obj1 + obj2
  }
}
// var c1 = create1("pro")
// c1(1, 2)


function infun (obj1, obj2) {
  console.log(obj1 + " -- " + obj2)
  return obj1 + obj2
}
function create2 (pro) {
  console.log("pro = " + pro)
  var obj1 = 1, obj2 = 2
  return infun(obj1, obj2) // 这个时候,会报错  
}
var c1 = create2("pro")