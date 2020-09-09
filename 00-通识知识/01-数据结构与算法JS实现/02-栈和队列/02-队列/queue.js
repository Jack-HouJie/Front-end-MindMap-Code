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

// 两个栈实现一个队列
class Queue1 {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }
  enQueue (item) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
    this.stack2.push(item)
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop())
    }
    return this.stack1
  }
  deQueue () {
    return this.stack1.pop()
  }
}
// let que = new Queue1()
// console.log(que.enQueue(1));
// console.log(que.enQueue(2));
// console.log(que.enQueue(4));
// console.log(que.deQueue());
// console.log(que.deQueue());
// console.log(que.deQueue());

// 实现循环队列
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    this.first = 0 // 队头
    this.last = 0 // 队尾
    this.size = 0 // 成员个数
  }
  /** 更改队列长度
   * 
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
  /** 得到队列容量
   * 
   */
  getLength () {
    return this.queue.length - 1
  }
  /** 入队
   * 
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
  /** 判空
   * 
   */
  isEmpty () {
    return this.first === this.last
  }
  /** 出队
   * 
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
  /** 得到队头元素
   * 
   */
  getHeader () {
    if (this.isEmpty()) {
      throw new Error('getHeader error! Queue is empty!')
    }
    return this.queue[this.first]
  }
}

/** 滑动窗口的最大值*
 * 给定一个数组 array ，有一个大小为 k 的滑动窗口从数组的最左侧移动
 * 到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。
 * 滑动窗口每次只向右移动一位。 返回滑动窗口最大值。
 * 
 * 思路
 * 使用一个双端队列（队列两面都可进出），
 * 用于存储处于窗口中的值的下标，
 * 保证窗口头部元素永远是窗口最大值
 * 1.如当前进入的元素下标 - 窗口头部元素的下标 >= k，则头部元素移出队列
 * 2.如果当前数字大于队列尾，则删除队列尾，直到当前数字小于等于队列尾，
 * 或者队列空 （保证窗口中左侧的值均大于当前入队列的值，
 * 这样做可以保证当下次循环窗口头部的元素出队后，窗口头部元素仍然为最大值）
 * 3.队列元素入队
 * 4.第k次遍历后开始向结果中添加最大值
 * @param {Number} array 
 * @param {Number} k 
 */
function maxSlidingWindow (array, k) {
  const window = []
  const result = []
  // 遍历每个下标值
  for (let i = 0; i < array.length; i++) {
    // 如果窗口过长
    if (i - window[0] > k - 1) {
      // 队头出队
      window.shift()
    }
    // 从后往前遍历，比当前值小则出队（保证队头最大）
    let j = window.length - 1
    while (j >= 0 && array[window[j]] <= array[i]) {
      j--
      window.pop()
    }
    // 当前索引入队
    window.push(i)
    // 从第k个开始添加结果
    if (i >= k - 1) {
      result.push(array[window[0]]);
    }
  }
  return result;
}
let result = maxSlidingWindow([1, 3, 1, -3, 5, 3, 6, 7], 3)


console.log('最终结果：' + result);