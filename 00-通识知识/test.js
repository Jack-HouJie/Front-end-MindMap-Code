// 1.线性表
// 1.2.1 实现单链表
class ListNode {
  constructor(val, next) {
    this.value = val
    this.next = next
  }
  exec () {
    console.log(this.value)
  }
}
class LinkList {
  constructor(headNode) {
    this.preHead = new LinkList(undefined, headNode)
    this.size = 0
  }
  /**
   * 检查越界直接抛出错误*
   * @param {Number} idx 
   */
  checkIdx (idx) {
    // 考虑idx小于0*
    if (idx >= this.size || idx < 0) {
      throw new Error('idx error!')
    }
  }

  /**
   * 抽象一个找节点方法*
   * @param {*} curNode 
   * @param {*} curIdx 
   * @param {*} tarIdx 
   */
  findNode (curNode, curIdx, tarIdx) {
    this.checkIdx(curIdx)
    this.checkIdx(tarIdx)
    if (curIdx === tarIdx) {
      return curNode
    } else {
      return this.findNode(curNode.next, curIdx + 1, tarIdx)
    }
  }

  insert (value, preIdx) {
    this.checkIdx(preIdx)
    let preNode = this.findNode(this.preHead.next, 0, preIdx)
    let newNode = new ListNode(value, preNode.next)
    preNode.next = newNode
    this.size++
    return newNode // 返回新节点*
  }

  delete (tarIdx) {
    this.checkIdx(tarIdx)
    let preNode = this.findNode(this.preHead.next, 0, tarIdx - 1)
    delNode = preNode.next // 需要处理删除的节点*
    preNode.next = delNode.next
    delNode.next = null // 解引用*
    this.size--
    return delNode // 返回删除的节点*
  }
}
