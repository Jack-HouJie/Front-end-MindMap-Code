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
   * @param {NodeList} curNode 
   * @param {Number} cur_idx 
   * @param {Number} tar_idx 
   */
  findNode (curNode, cur_idx, tar_idx) {
    // 类内部调用其他方法需使用this
    this.checkIndex(cur_idx)
    this.checkIndex(tar_idx)
    // 递归停止条件
    if (cur_idx === tar_idx) {
      return curNode
    }
    else {
      // 调用自己也需要加this
      return this.findNode(curNode.next, cur_idx + 1, tar_idx)
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
  let curNode = head
  // 遍历用while而不是if
  while (curNode) {
    // 队头入队用unshift 而不是shift
    temp.unshift(curNode)
    curNode = curNode.next
  }
  console.log(temp)
  return true
}
let pre_head = new ListNode(undefined, null)
let link_list = new LinkList(1, pre_head)
link_list.addNode(1, 0)
link_list.addNode(2, 1)
link_list.addNode(3, 2)
link_list.addNode(3, 3)
let head = link_list.findNode(link_list.pre_head, 0, 1)
// console.log(printListFromTailToHead(head))

/** 反转链表*
 * 
 * @param {ListNode} head 链表头节点
 */
function reverseList (head) {
  if (!head || !head.next) {
    return head
  }
  let pre = null
  let cur = head
  let next = head.next
  while(cur){
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
let reverse_head = reverseList(head)
while(reverse_head){
  console.log(reverse_head.value);
  reverse_head = reverse_head.next
}

/** 复杂链表复制
 * 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
 * @param {ListNode} pHead 
 */
function clone (pHead) {
  if (!pHead) {
    return null
  }
  cloneNodes(pHead)
  cloneRandom(pHead)
  return reconnetNodes(pHead)
}
function cloneNodes (pHead) {
  let curNode = pHead
  while (curNode) {
    let new_node = new ListNode(curNode.value, curNode.next)
    curNode.next = new_node
    curNode = new_node.next
  }
}
function cloneRandom (pHead) {
  let curNode = pHead
  while (curNode) {
    curNode.next.random = curNode.random.next
    curNode = curNode.next.next
  }
}
function reconnetNodes (pHead) {
  let curNode = pHead
  let copy_head = pHead.next
  while (curNode) {
    let copy_node = curNode.next
    curNode.next = copy_node.next
    curNode = copy_node.next
    copy_node.next = curNode.next
  }
  return copy_head
}


/** 删除链表重复节点
 * 出现次数大于1的节点
 * @param {ListNode} pHead 
 */
function deleteDuplication (pHead) {
  let map = {}
  let curNode = pHead
  while (curNode) {
    let count = map[curNode.value]
    map[curNode.value] = count ? count + 1 : 1
    curNode = curNode.next
  }
  curNode = pHead

  while (curNode) {
    // 如果当前是重复节点
    if (map[curNode.value] > 1) {
      // 如果不是链表末尾节点
      if (curNode.next) {
        // 下一个节点覆盖当前节点
        curNode.value = curNode.next.value
        let next_node = curNode.next
        curNode.next = next_node.next
        next_node.next = null
      }
      // 如果是链表末尾节点
      else {
        // 如果是唯一节点
        if (curNode == pHead) {
          // 将其删除
          curNode = null
          // 上一步只是解除了curNode和pHead的关系
          pHead = null
        }
        // 如果不是唯一节点
        else {
          // 找到倒数第二个节点
          let pre = pHead
          while (pre.next) {
            pre = pre.next
          }
          curNode.next = null
          // 删除最后一个节点*
          curNode = null
          pre.next = null
        }
      }
    }
    // 如果当前不是重复节点
    else {
      curNode = curNode.next
    }
  }
  return pHead
}
// let clean_head = deleteDuplication(head)
// while (clean_head) {
//   console.log(clean_head.value);
//   clean_head = clean_head.next
// }

/** 合并两个有序链表
 * 
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function merge (pHead1, pHead2) {
  // 递归停止条件
  if (!pHead1) {
    return pHead2
  }
  if (!pHead2) {
    return pHead1
  }
  // 递归的取小值*
  let merge_head = null
  if (pHead1 < pHead2) {
    merge_head = pHead1
    merge_head.next = merge(pHead1.next, pHead2)
  } else {
    merge_head = pHead2
    merge_head.next = merge(pHead1, pHead2.next)
  }
  return merge_head
}

/* 双指针问题 */
/** 输入一个链表，输出该链表中倒数第k个结点。
 * 
 * @param {ListNode} head 
 * @param {Number} k 
 */
function findKthToTail (head, k) {
  // 鲁棒性：考虑k为0或head不存在**
  if (!head || k == 0) {
    return null
  }
  let after_node = head
  let k_node = head
  let i = 0
  for (i = 0; i < k - 1; i++) {
    after_node = after_node.next
    // 鲁棒性：考虑k比链表长**
    if (!after_node) {
      return null
    }
  }
  while (after_node.next) {
    after_node = after_node.next
    k_node = k_node.next
  }
  return k_node
}
// console.log(findKthToTail(head, 0))
// console.log(findKthToTail(head, 1))
// console.log(findKthToTail(head, 2))
// console.log(findKthToTail(head, 3))
// console.log(findKthToTail(head, 4))
// console.log(findKthToTail(head, 5))


/** 找到第一个公共节点
 * 
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function findFirstCommonNode (pHead1, pHead2) {
  let list1_len = 0, list2_len = 0
  let curNode1 = pHead1
  while (curNode) {
    list1_len++
    curNode1 = curNode1.next
  }
  let curNode2 = pHead2
  while (curNode) {
    list2_len++
    curNode2 = curNode2.next
  }
  // 对齐
  curNode1 = pHead1
  curNode2 = pHead2
  if (list1_len > list2_len) {
    for (let i = 0; i < list1_len - list2_len; i++) {
      curNode1 = curNode1.next
    }
  }
  else if (list2_len > list1_len) {
    for (let i = 0; i < list2_len - list1_len; i++) {
      curNode2 = curNode2.next
    }
  }

  while (curNode1 !== curNode2) {
    curNode1 = curNode1.next
    curNode2 = curNode2.next
  }
  return curNode1
}

/* 环类题目 */
/** 链表中环的入口节点
 * 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null
 * @param {ListNode} pHead 
 */
function entryNodeOfLoop (pHead) {
  // 0.鲁棒性*
  if (!pHead || !pHead.next) {
    return null
  }
  // 1.判断链表是否有环： 
  // P1 P2 从头部出发，P1走两步，P2走一步，
  // 如果可以相遇，则环存在
  let node1 = pHead
  let node2 = pHead
  do {
    node1 = node1.next
    node2 = node2.next.next
    // 如果p2没进入环(代表没环)
    if (!p2 || !p2.next) {
      return null
    }
  } while (node1 != node2); // 如有环p1p2在出环点相遇*
  // 2.得到链表环的长度:
  // 从出环点开始计数，
  // 再回到此节点时的步数即为环长*
  let loop_length = 0
  do {
    loop_length++
    node2 = node2.next
  } while (node1 != node2);

  // 3.找到入环点
  // 从原地开始**，
  // 让node2比node1先走一个环长
  //（恰好比node1多走一个环）
  // 二者第一次相遇点即为入环点
  node1 = node2 = pHead
  for (let i = 0; i < loop_length; i++) {
    node2 = node2.next
  }
  while (node1 != node2) {
    node1 = node1.next
    node2 = node2.next
  }
  return node1
}
/** 圆圈中最后剩下的数/约瑟夫环问题
 * 
 * @param {Number} n 总数
 * @param {Number} m 跨度
 */
function lastRemainingSolution (n, m) {
  // 1.构造环形链表*
  let head = { value: 0 }
  let curNode = head
  for (let i = 0; i < n; i++) {
    let node = { value: i }
    curNode.next = node
    curNode = curNode.next
  }
  curNode.next = head
  //2.循环删除节点
  // 从头开始
  curNode = head
  // 当链表不止一个节点
  while (curNode != curNode.next) {
    // 每次找到当前节点后m-1个节点
    for (let i = 0; i < m - 1; i++) {
      curNode = curNode.next
    }
    // 直接指向m+1个节点(删除第m个节点)
    curNode.next = curNode.next.next
  }
  // 返回剩下节点的value
  return curNode.value
}
