// 实现队列
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue (item) {
    this.queue.push(item)
  }
  deQueue () {
    return this.queue.shift()
  }
  getFirster () {
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
  /**
   * 更改队列长度
   * @param {Number} length 
   */
  resize (length) {
    let nq = new Array(length)
    for (let i = 0; i < length; i++) {
      nq[i] = this.queue[(this.first + i) % this.queue.length]
    }
    this.queue = nq
    this.first = 0
    this.last = this.size
  }
  /**
   * 得到队列容量
   */
  getLength () {
    return this.queue.length - 1
  }
  /**
   * 入队
   * @param {*} item 
   */
  enQueue (item) {
    // 如果队满
    if ((this.last + 1) % this.queue.length == this.first) {
      this.resize(this.getLength() * 2 + 1) // 扩充队列长度
    }
    this.queue[this.last] = item // item存入队尾
    this.size++ // 更新成员数
    this.last = (this.last + 1) % this.queue.length // 更新队尾位置
  }
  /**
   * 判空
   */
  isEmpty () {
    return this.first === this.last
  }
  /**
   * 出队
   */
  deQueue () {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first] // 取得队头元素
    this.queue[this.first] = null // 队头元素出队
    this.first = (this.first + 1) % this.queue.length // 更新队头位置
    this.size-- // 更新成员个数
    // 如果成员数过少，且非空队
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2) // 缩短队列长度
    }
    return r
  }
  /**
   * 得到队头元素
   */
  getHeader () {
    if (this.isEmpty()) {
      throw new Error('Queue is empty')
    }
    return this.queue[this.first]
  }

}