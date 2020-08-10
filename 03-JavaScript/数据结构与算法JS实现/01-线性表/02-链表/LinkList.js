/**
 * 实现单链表
 */
class ListNode {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor(size, dummyNode) {
    this.size = size // 链表长度
    this.dummyNode = dummyNode
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
    ary.unshift(head.value) // 数组头入当前节点
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

/**
 * 复杂链表复制
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
    let node = new ListNode(cur_node.value, cur_node.next)
    cur_node.next = node
    cur_node = node.next
  }
}
function cloneRandom (pHead) {
  let cur_node = pHead
  let clone_node = cur_node.next
  while (cur_node) {
    // 这里cur_node.random.next 而不是cur_node.random
    // 因为要随机指向新链表中的节点
    clone_node.random = cur_node.random.next
    cur_node = clone_node.next
  }
}
function reconnetNodes (pHead) {
  let cur_node = pHead
  let clone_head = pHead.next
  let clone_node = pHead.next
  while (cur_node) {
    cur_node.next = clone_node.next
    cur_node = clone_node.next
    clone_node.next = cur_node.next
    clone_node = cur_node.next
  }
  return clone_head
}

/**
 * 合并两个有序链表
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function merge (pHead1, pHead2) {
  if (!pHead1) {
    return pHead2
  }
  if (!pHead2) {
    return pHead1
  }
  let head
  if (pHead1.value < pHead2.value) {
    head = pHead1
    head.next = merge(pHead1.next, pHead2)
  }
  // 应考虑相等情况
  else if (pHead1.value >= pHead2.value) {
    head = pHead2
    head.next = merge(pHead1, pHead2.next)
  }
  return head
}

/**
 * 输入一个链表，输出该链表中倒数第k个结点。
 * @param {ListNode} head 
 * @param {Number} k 
 */
function findKthToTail (head, k) {
  // 应考虑k为0*
  if (!head || !k) {
    return null
  }
  let cur_node = head
  let k_node = head
  for (let i = 0; i < k; i++) {
    k_node = k_node.next
    // 应考虑k比链表长*
    if (!k_node) {
      return null
    }
  }
  while (k_node.next) {
    cur_node = cur_node.next
    k_node = k_node.next
  }
  return cur_node
}

/**
 * 链表中环的入口节点
 * @param {ListNode} pHead 
 */
function entryNodeOfLoop (pHead) {
  // 考虑鲁棒性*
  if (!pHead || !pHead.next) {
    return null
  }
  // 1.判断是否有环
  let p1 = pHead
  let p2 = pHead
  do {
    p1 = p1.next
    p2 = p2.next.next
    // 如果p2没进入环
    if (!p2 || !p2.next) {
      return null
    }
  } while (p1 != p2); // 如有环p1p2在出环点相遇

  // 2.获取环长度
  let loop_length = 0
  do {
    p2 = p2.next
    loop_length++
  } while (p1 != p1);

  // 3.找到入环点
  // p1 p2 回到原点*
  p1 = p2 = pHead
  for (let i = 0; i < loop_length; i++) {
    p2 = p2.next // 让p2 先走一个环长
  }
  // p1p2在入环点相遇（跨度都为1时p2多走了一个环）
  while (p1 != p2) {
    p1 = p1.next
    p2 = p2.next
  }
  return p1
}

/**
 * 找到第一个公共节点
 * @param {ListNode} pHead1 
 * @param {ListNode} pHead2 
 */
function findFirstCommonNode (pHead1, pHead2) {
  // 1.获取长度
  let cur_node1 = pHead1
  let length1 = 0
  while (cur_node1) {
    length1 += 1
    cur_node1 = cur_node1.next
  }
  cur_node2 = pHead2
  let length2 = 0
  while (cur_node2) {
    length2 += 1
    cur_node2 = cur_node2.next
  }
  // 2.起点对齐
  if (length1 < length2) {
    for (let i = 0; i < length2 - length1; i++) {
      cur_node2 = cur_node2.next
    }
  } else {
    for (let i = 0; i < length1 - length2; i++) {
      cur_node1 = cur_node1.next
    }
  }
  // 3.找到公共节点（第一个相遇点）
  while (cur_node1 != cur_node2) {
    cur_node1 = cur_node1.next
    cur_node2 = cur_node2.next
  }
  return cur_node1
}

/**
 * 圆圈中最后剩下的数/约瑟夫环问题
 * @param {Number} n 总数
 * @param {Number} m 跨度
 */
function lastRemainingSolution (n, m) {
  // 鲁棒性*
  if (!n || !m) {
    return -1
  }
  // 创建环形链表
  let head = { value: 0 }
  let cur_node = head
  for (let i = 1; i < n; i++) {
    let node = { value: i }
    cur_node.next = node
    cur_node = node
  }
  cur_node.next = head
  // 当链表不止一个节点
  while (cur_node != cur_node.next) {
    // 找到第m-1个节点
    for (let i = 0; i < m; i++) {
      cur_node = cur_node.next
    }
    // 直接指向m+1个节点
    cur_node.next = cur_node.next.next
  }
  // 返回剩下节点的value
  return cur_node.value
}

/**
 * 删除链表重复节点
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
  // 第一个节点也有可能是重复节点
  let cur_node = pHead
  while (cur_node) {
    // 如果当前节点不止一个
    if (map[cur_node] > 1) {
      // 如存在下一个节点*
      if (cur_node.next) {
        // 下一个节点覆盖当前节点
        cur_node.value = cur_node.next.value
        cur_node.next = cur_node.next.next
      }
      // 如最后只剩一个重复节点
      else if (cur_node == pHead) {
        // 将其删除
        cur_node = null
        pHead = null
      }
      // 如为最后一个节点
      else {
        // 找到倒数第二个节点
        cur_node = pHead
        while (cur_node.next.next) {
          cur_node = cur_node.next
        }
        cur_node.next = null // 删除最后一个节点
        cur_node = null
      }
    } else {
      cur_node = cur_node.next
    }
  }
  return pHead
}