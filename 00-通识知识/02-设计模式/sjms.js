// 单例模式
class SingleInstanceClass {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  static getInstance () {
    if (!SingleInstanceClass.instance) {
      SingleInstanceClass.instance = new SingleInstanceClass()
      return SingleInstanceClass.instance
    } else {
      return SingleInstanceClass.instance
    }
  }
}
let a = SingleInstanceClass.getInstance()
let b = SingleInstanceClass.getInstance()
console.log(a === b);