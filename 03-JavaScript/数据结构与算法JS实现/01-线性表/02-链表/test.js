/* 实现单链表 */
class ListNode {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}
class LinkList {
  constructor(size, pre_head) {
    this.size = size
    this.pre_head = pre_head
  }

  /** 检查越界
   * 
   * @param {Number} idx 
   */
  checkIndex (idx) {
    // 考虑小于0情况
    if (idx > this.size || idx < 0) {
      // 通过抛出一个错误而不是返回布尔值
      throw new Error('Index error!')
    }
  }

  /** 得到指定位置节点(传入开始节点、开始节点索引、目标节点索引)
   * 思路：通过递归实现
   * @param {NodeList} cur_node 
   * @param {Number} cur_idx 
   * @param {Number} tar_idx 
   */
  findNode (cur_node, cur_idx, tar_idx) {
    // 类内部调用其他方法需使用this
    this.checkIndex(cur_idx)
    this.checkIndex(tar_idx)
    // 递归停止条件
    if (cur_idx === tar_idx) {
      return cur_node
    }
    else {
      // 调用自己也需要加this
      return this.findNode(cur_node.next, cur_idx + 1, tar_idx)
    }
  }

  /** 添加节点(给定value、前一个位置index)
   * 
   * @param {*} value 
   * @param {*} index 
   */
  addNode (value, index) {
    this.checkIndex(index)
    let pre = this.findNode(this.pre_head, 0, index)
    let new_node = new ListNode(value, pre.next)
    pre.next = new_node
    // 更新链表长度
    this.size++
    return new_node
  }

  /** 删除指定index后节点
   * 
   * @param {Number} index 
   */
  rmNode (index) {
    this.checkIndex(index + 1)
    let pre = this.findNode(this.pre_head, 0, index)
    let del_node = pre.next
    pre.next = del_node.next
    del_node.next = null
    // 更新链表长度
    this.size--
    return del_node
  }
}

/* 基本应用 */
/** 从尾到头打印链表 （给链表头结点）
 */
function printListFromTailToHead (head) {
  if (!head) return false
  let temp = []
  let cur_node = head
  // 遍历用while而不是if
  while (cur_node) {
    // 队头入队用unshift 而不是shift
    temp.unshift(cur_node)
    cur_node = cur_node.next
  }
  console.log(temp)
  return true
}
let pre_head = new ListNode(undefined, null)
let link_list = new LinkList(1, pre_head)
link_list.addNode(1, 0)
link_list.addNode(2, 1)
link_list.addNode(3, 2)
let head = link_list.findNode(link_list.pre_head, 0, 1)
// console.log(printListFromTailToHead(head))


/** 反转链表
 * 
 * @param {ListNode} head 链表头节点
 */
function reverseList (head) {
  if (!head || !head.next) {
    return head
  }
  let pre = null
  let cur = head
  let next = cur.next
  while (cur) {
    // 每次先更新next*
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
// let reverse_head = reverseList(head)
// while(reverse_head){
//   console.log(reverse_head.value);
//   reverse_head = reverse_head.next
// }

/** 复杂链表复制
 * 
 * @param {ListNode} pHead 
 */
function clone (pHead) {
}
function cloneNodes (pHead) {
}
function cloneRandom (pHead) {
}
function reconnetNodes (pHead) {
}
/** 删除链表重复节点
 */
function deleteDuplication () {
}
/** 合并两个有序链表
 */
function merge () {
}

/* 双指针问题 */
/** 输入一个链表，输出该链表中倒数第k个结点。
 */
function findKthToTail () {
}
/** 找到第一个公共节点
 */
function findFirstCommonNode () {
}

/* 环类题目 */
/** 链表中环的入口节点
 */
function entryNodeOfLoop () {
}
/** 圆圈中最后剩下的数/约瑟夫环问题
 */
function lastRemainingSolution () {
}