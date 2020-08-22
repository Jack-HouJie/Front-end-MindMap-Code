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
link_list.addNode(3, 3)
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
  let cur_node = pHead
  while (cur_node) {
    let new_node = new ListNode(cur_node.value, cur_node.next)
    cur_node.next = new_node
    cur_node = new_node.next
  }
}
function cloneRandom (pHead) {
  let cur_node = pHead
  while (cur_node) {
    cur_node.next.random = cur_node.random.next
    cur_node = cur_node.next.next
  }
}
function reconnetNodes (pHead) {
  let cur_node = pHead
  let copy_head = pHead.next
  while (cur_node) {
    let copy_node = cur_node.next
    cur_node.next = copy_node.next
    cur_node = copy_node.next
    copy_node.next = cur_node.next
  }
  return copy_head
}


/** 删除链表重复节点
 * 出现次数大于1的节点
 * @param {ListNode} pHead 
 */
function deleteDuplication (pHead) {
  let map = {}
  let cur_node = pHead
  while (cur_node) {
    let count = map[cur_node.value]
    map[cur_node.value] = count ? count + 1 : 1
    cur_node = cur_node.next
  }
  cur_node = pHead

  while (cur_node) {
    // 如果当前是重复节点
    if (map[cur_node.value] > 1) {
      // 如果不是链表末尾节点
      if (cur_node.next) {
        // 下一个节点覆盖当前节点
        cur_node.value = cur_node.next.value
        let next_node = cur_node.next
        cur_node.next = next_node.next
        next_node.next = null
      }
      // 如果是链表末尾节点
      else {
        // 如果是唯一节点
        if (cur_node == pHead) {
          // 将其删除
          cur_node = null
          // 上一步只是解除了cur_node和pHead的关系
          pHead = null
        }
        // 如果不是唯一节点
        else {
          // 找到倒数第二个节点
          let pre = pHead
          while (pre.next) {
            pre = pre.next
          }
          cur_node.next = null
          // 删除最后一个节点*
          cur_node = null
          pre.next = null
        }
      }
    }
    // 如果当前不是重复节点
    else {
      cur_node = cur_node.next
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
console.log(findKthToTail(head, 0))
console.log(findKthToTail(head, 1))
console.log(findKthToTail(head, 2))
console.log(findKthToTail(head, 3))
console.log(findKthToTail(head, 4))
console.log(findKthToTail(head, 5))


/** 找到第一个公共节点
 * 
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function findFirstCommonNode (pHead1, pHead2) {
  let list1_len = 0, list2_len = 0
  let cur_node1 = pHead1
  while (cur_node) {
    list1_len++
    cur_node1 = cur_node1.next
  }
  let cur_node2 = pHead2
  while (cur_node) {
    list2_len++
    cur_node2 = cur_node2.next
  }
  // 对齐
  cur_node1 = pHead1
  cur_node2 = pHead2
  if (list1_len > list2_len) {
    for (let i = 0; i < list1_len - list2_len; i++) {
      cur_node1 = cur_node1.next
    }
  }
  else if (list2_len > list1_len) {
    for (let i = 0; i < list2_len - list1_len; i++) {
      cur_node2 = cur_node2.next
    }
  }

  while (cur_node1 !== cur_node2) {
    cur_node1 = cur_node1.next
    cur_node2 = cur_node2.next
  }
  return cur_node1
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
  let cur_node = head
  for (let i = 0; i < n; i++) {
    let node = { value: i }
    cur_node.next = node
    cur_node = cur_node.next
  }
  cur_node.next = head
  //2.循环删除节点
  // 从头开始
  cur_node = head
  // 当链表不止一个节点
  while (cur_node != cur_node.next) {
    // 每次找到当前节点后m-1个节点
    for (let i = 0; i < m - 1; i++) {
      cur_node = cur_node.next
    }
    // 直接指向m+1个节点(删除第m个节点)
    cur_node.next = cur_node.next.next
  }
  // 返回剩下节点的value
  return cur_node.value
}
