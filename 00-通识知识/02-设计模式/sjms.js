class SingleInstance {
  constructor() {
  }
}
SingleInstance.getInstance = function () {
  let instance
  return (function () {
    if (!instance) {
      instance = new SingleInstance()
    }
    else {
      return instance
    }
  })()
}

let instance1 = SingleInstance.getInstance()
let instance2 = SingleInstance.getInstance()
console.log(instance1 === instance2)