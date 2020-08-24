class TNode {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
  print () {
    console.log(this.value);
  }
  exec () {
    console.log(this.value);
  }
}
class BiTree {
  constructor(node) {
    this.root = node
    this.size = 1
  }
  insert (node, value) {
    if (value < node.value) {
      if (node.left) {
        this.insert(node.left, value)
      }
      else {
        this.size++
        node.left = new TNode(value)
      }
    }
    if (value > node.value) {
      if (node.right) {
        this.insert(node.right, value)
      }
      else {
        this.size++
        node.right = new TNode(value)
      }
    }
  }
  preOrder (node) {
    if (!node) {
      return null
    }
    node.exec()
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
  midOrder (node) {
    if (!node) {
      return null
    }
    this.midOrder(node.left)
    node.exec()
    this.midOrder(node.right)
  }
  backOrder (node) {
    if (!node) {
      return null
    }
    this.backOrder(node.left)
    this.backOrder(node.right)
    node.exec()
  }
  preOrderNR (node) {
    if (!node) {
      return
    }
    let stack = []
    stack[0] = node
    while (stack.length) {
      let curNode = stack.pop()
      curNode.exec()
      if (curNode.right) {
        stack.push(curNode.right)
      }
      if (curNode.left) {
        stack.push(curNode.left)
      }
    }
  }
  midOrderNR (node) {
    if (!node) {
      return
    }
    let stack = []
    let curNode = node
    while (curNode || stack.length) {
      if (curNode) {
        stack.push(curNode)
        curNode = curNode.left
      }
      else {
        curNode = stack.pop()
        curNode.exec()
        curNode = curNode.right
      }
    }
  }
  backOrderNR (node) {
    if (!node) {
      return
    }
    let stack = []
    stack.push(node)
    let reverseArr = []
    while (stack.length) {
      let node = stack.pop()
      reverseArr.push(node)
      if (node.left) {
        stack.push(node.left)
      }
      if (node.right) {
        stack.push(node.right)
      }
    }
    while (reverseArr.length) {
      let curNode = reverseArr.pop()
      curNode.exec()
    }
  }
  breTravesal (node) {
    if (!node) {
      return false
    }
    let queue = []
    queue.push(node)
    while (queue.length) {
      let curNode = queue.shift()
      if (curNode.left) {
        queue.push(curNode.left)
      }
      if (curNode.right) {
        queue.push(curNode.right)
      }
      curNode.exec()
    }

  }
}

let tree = new BiTree(new TNode(10))

tree.insert(tree.root, 1)
tree.insert(tree.root, 100)
tree.insert(tree.root, 50)
tree.insert(tree.root, 105)
// tree.preOrder(tree.root)
// tree.midOrder(tree.root)
// tree.backOrder(tree.root)
// tree.preOrderNR(tree.root)
// tree.midOrderNR(tree.root)
// tree.backOrder(tree.root)
// tree.breTravesal(tree.root)