// 第二题
const line1Arr = readline().split(' ');
const peopleNum = line1Arr[0]
const raceNum = line1Arr[1]
const tarIdx = line1Arr[2]
const race = []
for (var i = 0; i < raceNum; i++) {
  curLine = readline().split(" ")
  race.push(curLine)
}
class ListNode {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor(size, preHead) {
    this.size = size // 链表长度
    this.preHead = preHead
  }
  /** 检查越界
   * @param {Number} index 索引值
   */
  checkIndex (index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index error!')
    }
  }

  /** 得到节点(指定索引)
   * @param {ListNode} curNode 开始查找节点
   * @param {Number} curIndex 开始查找节点索引
   * @param {Number} tarIndex 目标索引
   */
  findNode (curNode, curIndex, tarIndex) {
    this.checkIndex(curIndex)
    this.checkIndex(tarIndex)
    if (tarIndex === curIndex) {
      return curNode
    } else {
      return this.findNode(curNode.next, curIndex + 1, tarIndex)
    }
  }

  /** 添加节点(给定value、前一个位置index)
   * @param {*} value 添加节点值
   * @param {*} index 添加节点索引-1
   */
  addNode (value, index) {
    this.checkIndex(index) // 检查越界
    let pre = this.findNode(this.preHead, 0, index) // 当前index位置节点作为前驱节点
    let newNode = new ListNode(value, pre.next) // 创建插入节点
    pre.next = newNode // 插入
    this.size++ // 更新链表长度
    return newNode
  }

  /** 删除指定index后节点
   * @param {Number} index 删除节点索引-1
   */
  rmNode (index) {
    this.checkIndex(index + 1) // 检查越界
    let pre = this.findNode(this.preHead, 0, index) // index位置节点作为前驱节点
    let delNode = pre.next // 临时存储要删除节点
    pre.next = delNode.next // 链表中删除指定节点
    delNode.next = null // 删除的节点更新指针域
    this.size-- // 更新长度*
    return delNode
  }
}


function func2 (peopleNum, raceNum, race, tarIdx) {
  let rank = new LinkList(0, new ListNode(undefined, null))
  const peopleRank = new Array(peopleNum)
  for (let i = 0; i < raceNum; i++) {
    
  }

}
