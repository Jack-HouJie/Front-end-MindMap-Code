function debounce (func, wait_time = 500) {
  let timer = 0
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    else {
      timer = setTimeout(() => {
        func.apply(this, ...args)
      }, wait_time)
    }
  }
}

setInterval(() => {
  debounce(() => {
    console.log("test");
  }, 10)
}, 211)