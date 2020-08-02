// 实现队列
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue (item) {
    this.queue.push(item)
  }
  deQueue (item) {
    return this.queue.shift()
  }
  getfirster () {
    return this.queue[0]
  }
  getLength () {
    return this.queue.length
  }
  isEmpty () {
    return this.getCount() === 0
  }
}
// 实现循环队列
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    this.first = 0 // 队头
    this.last = 0 // 队尾
    this.size = 0 // 成员个数
  }
  enQueue (item) {
    if ((this.last + 1) % this.queue.length == this.first) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue () {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r
  }
  getHeader () {
    if (this.isEmpty()) {
      throw new Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength () {
    // 得到队列容量
    return this.queue.length - 1
  }
  isEmpty () {
    return this.first === this.last
  }
  resize (length) {
    let nq = new Array(length)
    for (let i = 0; i < length; i++) {
      nq[i] = this.queue[(this.first + i) % this.queue.length]
    }
    this.queue = nq
    this.first = 0
    this.last = this.size
  }
}