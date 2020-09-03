class MaxHeap {
  /** 大顶堆构造函数
   * @param {Array} arr 待调整二叉树（存储结构：数组）
   */
  constructor(arr) {
    this.arr = arr
    this.length = arr.length
    // 从第一个非叶子节点开始逐层向上
    // 遍历每层的元素进行下沉操作
    for (let i = Math.floor(this.length >> 1) - 1; i >= 0; i--) {
      this.adjust(i)
    }
  }
  /** 调整堆子树
   * 某一子树调整至大顶
   * @param {*} index 当前要调整子树的根节点
   */
  adjust (index) {
    // 逐层深入处理
    for (let i = (index << 1) + 1; i < this.length; i = (i << 1) + 1) {
      // i取每层的最大值索引
      if (i + 1 < this.length && this.arr[i + 1] > this.arr[i]) {
        i++
      }
      if (this.arr[index] < this.arr[i]) {
        [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]
        index = i
      } else {
        // 本层有序则本子树不要调整
        break
      }
    }
  }
  /** 大顶堆的插入
   * @param {Number} value 
   */
  add (value) {
    if (this.length === 0) {
      return [value]
    }
    this.arr[this.length] = value
    this.length++
    // 逐层向上找到合适位置
    let parentIdx = Math.floor(this.length >> 1)
    if (this.arr[(parentIdx << 1) + 1] !== value) {
      parentIdx--
    }
    while (parentIdx >= 0 && this.arr[parentIdx] < value) {
      this.adjust(parentIdx)
      parentIdx = Math.floor(parentIdx >> 1)
      if (this.arr[(parentIdx << 1) + 1] !== value) {
        parentIdx--
      }
    }
    return this.arr
  }
  /** 大顶堆删除（弹出最大值）
   */
  pop () {
    if (this.length === 0) {
      return null
    }
    if (this.length === 1) {
      return this.arr.pop()
    }
    let maxVal = this.arr[0]
    this.arr[0] = this.arr[this.length - 1]
    this.arr.pop()
    this.length--
    this.adjust(0)
    return maxVal
  }
}



let arr = [1, 5, 3, 4, 6, 2]
let heap = new MaxHeap(arr)
console.log(heap);
heap.pop()
console.log(heap);
heap.add(10)
console.log(heap);
heap.add(8)
console.log(heap);
heap.pop()
console.log(heap);
heap.pop()
console.log(heap);