class ListNode {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    this.size = 0
    this.dummyNode = null
  }
  // 得到指定位置节点
  find (first, index, cur_index) {
    if (index === cur_index) {
      return first
    } else {
      return find(first.next, index, cur_index + 1)
    }
  }
  // 在指定index后添加节点，返回添加的节点引用
  addNode (value, index) {
    this.checkIndex(index)
    let pre_node = find(this.dummyNode, index, 0)
    pre_node.next = new ListNode(value, pre_node.next)
    this.size++
    return pre_node.next
  }
  // 删除指定index后节点
  rmNode (index) {
    this.checkIndex(index + 1)
    let pre_node = find(this.dummyNode, index, 0)
    let node = pre_node.next
    pre_node.next = node.next
    node.next = null
    this.size--
    return node
  }
  // 检查越界
  checkIndex (index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index error!')
    }
  }
}


// 从尾到头打印链表
function printListFromTailToHead (head) {
  const ary = [];
  while (head) {
    //数组头入
    ary.unshift(head.val);
    head = head.next;
  }
  return console.log(ary)
}

// 反转链表
function reverseList (head) {
  if (!head || !head.next) {
    return head
  }
  let pre = null
  let cur = head
  let next = cur.next
  while (cur) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
