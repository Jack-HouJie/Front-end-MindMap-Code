/* 实现单链表 */
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
   * 
   * @param {Number} index 索引值
   */
  checkIndex (index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index error!')
    }
  }

  /** 得到节点(指定索引)
   * 
   * @param {ListNode} curNode 开始查找节点
   * @param {Number} curIndex 开始查找节点索引
   * @param {Number} tarIndex 目标索引
   */
  findNode (curNode, curIndex, tarIndex) {
    this.checkIndex(cur_idx)
    this.checkIndex(tar_idx)
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

/* 基本应用 */
/** 从尾到头打印链表
 * 
 * @param {ListNode} head 链表头节点
 */
function printListFromTailToHead (head) {
  if (!head) {
    return false
  }
  // 辅助队列
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
// let preHead = new ListNode(undefined, null)
// let link_list = new LinkList(1, preHead)
// link_list.addNode(1, 0)
// link_list.addNode(2, 1)
// link_list.addNode(3, 2)
// link_list.addNode(4, 3)
// let head = link_list.findNode(link_list.preHead, 0, 1)
// console.log(printListFromTailToHead(head))

/** 反转链表*
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
  let next = head.next
  // 当 当前节点 存在时
  while (cur) {
    next = cur.next // 拿到后继节点
    cur.next = pre // 更新当前指针域名
    pre = cur // 更新前驱节点
    cur = next // 更新当前节点
  }
  return pre
}
/** 复杂链表复制
 * 输入一个复杂链表（每个节点中有节点值，以及两个指针，
 * 一个指向下一个节点，另一个特殊指针指向任意一个节点），
 * 返回结果为复制后复杂链表的head。
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
    let node = new ListNode(curNode.value, curNode.next)
    curNode.next = node
    curNode = node.next
  }
}
function cloneRandom (pHead) {
  let curNode = pHead
  while (curNode) {
    // 这里curNode.random.next 而不是curNode.random
    // 因为要随机指向新链表中的节点
    curNode.next.random = curNode.random.next
    curNode = curNode.next.next
  }
}
function reconnetNodes (pHead) {
  let curNode = pHead
  let clone_head = pHead.next
  let clone_node = pHead.next
  while (curNode) {
    curNode.next = clone_node.next
    curNode = clone_node.next
    clone_node.next = curNode.next
    clone_node = curNode.next
  }
  return clone_head
}
/** 删除链表重复节点*
 * 出现次数大于1的节点
 * @param {ListNode} pHead 
 */
function deleteDuplication (pHead) {
  let map = {}
  let curNode = pHead
  // 统计次数
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
        let nextNode = curNode.next
        curNode.next = nextNode.next
        nextNode.next = null
      }
      // 如果是链表末尾节点
      else {
        // 如果是唯一节点
        if (curNode == pHead) {
          // 解除curNode和pHead的关系
          curNode = null
          // 删除节点
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
          // 解除curNode和尾节点的关系
          curNode = null
          // 删除尾节点
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
/** 合并两个有序链表*
 * 
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function merge (pHead1, pHead2) {
  // 递归停止条件：一方为空返回对方
  if (!pHead1) {
    return pHead2
  }
  if (!pHead2) {
    return pHead1
  }
  let head // 结果链表中每次迭代处理的节点
  if (pHead1.value < pHead2.value) {
    // 小节点作为当前节点
    head = pHead1
    // 递归的将较小节点作为下一个节点
    head.next = merge(pHead1.next, pHead2)
  }
  // 应考虑相等情况
  else if (pHead1.value >= pHead2.value) {
    head = pHead2
    head.next = merge(pHead1, pHead2.next)
  }
  return head
}

/* 双指针问题 */
/** 找到链表倒数第k个结点*
 * @param {ListNode} head 
 * @param {Number} k 
 */
function findKthToTail (head, k) {
  // 鲁棒性：考虑k为0或head不存在**
  if (!head || k == 0) {
    return null
  }
  let afterNode = head
  let kNode = head
  let i = 0
  for (i = 0; i < k - 1; i++) {
    afterNode = afterNode.next
    // 鲁棒性：考虑k比链表长**
    if (!afterNode) {
      return null
    }
  }
  while (afterNode.next) {
    afterNode = afterNode.next
    kNode = kNode.next
  }
  return kNode
}
// console.log(findKthToTail(head, 0))
// console.log(findKthToTail(head, 1))
// console.log(findKthToTail(head, 2))
// console.log(findKthToTail(head, 3))
// console.log(findKthToTail(head, 4))
// console.log(findKthToTail(head, 5))

/** 找到两链表第一个公共节点
 * 
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function findFirstCommonNode (pHead1, pHead2) {
  // 1.获取长度
  let curNode1 = pHead1
  let length1 = 0
  while (curNode1) {
    length1 += 1
    curNode1 = curNode1.next
  }
  curNode2 = pHead2
  let length2 = 0
  while (curNode2) {
    length2 += 1
    curNode2 = curNode2.next
  }
  // 2.起点对齐
  if (length1 < length2) {
    for (let i = 0; i < length2 - length1; i++) {
      curNode2 = curNode2.next
    }
  } else {
    for (let i = 0; i < length1 - length2; i++) {
      curNode1 = curNode1.next
    }
  }
  // 3.找到公共节点（第一个相遇点）
  while (curNode1 != curNode2) {
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
  // 从原点开始，
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
 * 0,1,...,n-1这n个数字排成一个圆圈，从数字0开始，
 * 每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。
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
    // 删除第m个节点(m-1直接指向m+1)
    curNode.next = curNode.next.next
  }
  // 返回剩下节点的value
  return curNode.value
}
