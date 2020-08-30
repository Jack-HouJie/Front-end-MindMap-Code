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

/**
 * 两个栈实现一个队列
 */
class Queue1 {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }
  enQueue (item) {
    this.stack1.push(item)
  }
  deQueue () {
    if(this.stack2.length === 0){
      while(stack1){
        this.stack2.push(stack1.pop())
      }
    }
    else {
      return this.stack2.pop()
    }
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
      throw Error('deQueue error! Queue is empty!')
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
      throw new Error('getHeader error! Queue is empty!')
    }
    return this.queue[this.first]
  }

}

/** 滑动窗口的最大值
 * 给定一个数组 array ，有一个大小为 k 的滑动窗口从数组的最左侧移动
 * 到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。
 * 滑动窗口每次只向右移动一位。 返回滑动窗口最大值。
 * @param {Number} array 
 * @param {Number} k 
 */
function maxSlidingWindow (array, k) {
  // window：一个双端队列（队列两面都可进出），
  // 用于存储处于窗口中的值的下标，
  // 保证窗口头部元素永远是窗口最大值
  let index_window = []
  let result = []
  for (let i = 0; i < array.length; i++) {
    console.log("i=" + i + "开始");
    // 如果当前处理元素距离窗口队头距离大于k
    if (i - index_window[0] > k - 1) {
      // 窗口头部出队
      index_window.shift()
      console.log("窗口头部出队一次");
    }
    // 如果当前数字大于队列尾，则删除队列尾，
    // 直到当前数字小于等于队列尾，或者队列空
    let j = index_window.length - 1
    while (j >= 0 && array[index_window[j]] <= array[i]) {
      j--
      index_window.pop()
      console.log("窗口尾部出队一次");
    }
    index_window.push(i)
    console.log("当前index_window:" + index_window);
    if (i >= k - 1) {
      // 从k个元素开始，每次输出当前最大值
      result.push(array[index_window[0]])
    }
    console.log("当前结果:" + result);
  }
  return result
}
// let result = maxSlidingWindow([1, 3, 1, -3, 5, 3, 6, 7], 3)






console.log('最终结果：' + result);