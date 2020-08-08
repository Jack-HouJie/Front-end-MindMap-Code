class ListNode {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    this.size = 0 // 链表长度
    this.dummyNode = null
  }

  /**
   * 得到指定位置节点
   * @param {ListNode} first 开始遍历的节点
   * @param {Number} index 目的结点索引
   * @param {Number} cur_index 开始遍历的节点索引
   */
  find (first, index, cur_index) {
    if (index === cur_index) {
      return first
    } else {
      return find(first.next, index, cur_index + 1)
    }
  }

  /**
   * 检查越界
   * @param {Number} index 索引值
   */
  checkIndex (index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index error!')
    }
  }

  /**
   * 添加节点在index位置后
   * @param {*} value 添加节点值
   * @param {Number} index 添加节点索引
   */
  addNode (value, index) {
    this.checkIndex(index) // 检查越界
    let pre_node = find(this.dummyNode, index, 0) // 当前index位置节点作为前驱节点
    pre_node.next = new ListNode(value, pre_node.next) // 创建插入节点并插入
    this.size++ // 更新链表长度
    return pre_node.next
  }

  /**
   * 删除指定index后节点
   * @param {Number} index 删除节点索引-1
   */
  rmNode (index) {
    this.checkIndex(index + 1) // 检查越界
    let pre_node = find(this.dummyNode, index, 0) // 当前index位置节点作为前驱节点
    let node = pre_node.next // 临时存储要删除节点
    pre_node.next = node.next // 链表中删除指定节点
    node.next = null // 删除的节点更新指针域
    this.size-- // 更新长度
    return node
  }

}

/**
 * 从尾到头打印链表
 * @param {ListNode} head 链表头节点
 */
function printListFromTailToHead (head) {
  const ary = []
  while (head) {
    ary.unshift(head.val) // 数组头入当前节点
    head = head.next
  }
  return console.log(ary)
}

/**
 * 反转链表
 * @param {ListNode} head 链表头节点
 */
function reverseList (head) {
  // 如果为空或者只有一个节点
  if (!head || !head.next) {
    return head // 返回本身
  }
  // 当前节点初始化为头节点
  let pre = null
  let cur = head
  let next = head.newt
  // 当 当前节点 存在时
  while (cur) {
    next = cur.next // 拿到后继节点
    cur.next = pre // 更新当前指针域名
    pre = cur // 更新前驱节点
    cur = next // 更新当前节点
  }
  return pre
}
