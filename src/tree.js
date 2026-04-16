export class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  setLeft(value) {
    this.left = value;
  }

  setRight(value) {
    this.right = value;
  }
}

export class Tree {
  #mergeSort(array = []) {
    if (array.length === 0) return [];
    if (array.length === 1) return array;

    const leftHalf = this.#mergeSort(array.slice(0, array.length / 2));
    const rightHalf = this.#mergeSort(array.slice(array.length / 2));

    const sorted = [];
    let l = 0;
    let r = 0;

    while (l < leftHalf.length && r < rightHalf.length) {
      sorted.push(leftHalf[l] > rightHalf[r] ? rightHalf[r++] : leftHalf[l++]);
    }

    while (l < leftHalf.length) sorted.push(leftHalf[l++]);
    while (r < rightHalf.length) sorted.push(rightHalf[r++]);

    return sorted;
  }

  #removeDuplicate(array = []) {
    return array.filter((num, index) => num !== array[index + 1]);
  }

  #buildTree(array = [], start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.setLeft(this.#buildTree(array, start, mid - 1));
    root.setRight(this.#buildTree(array, mid + 1, end));

    return root;
  }

  constructor(array = []) {
    const sorted = this.#mergeSort(array);
    const uniques = this.#removeDuplicate(sorted);

    this.root = this.#buildTree(uniques);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value) {
    const search = (node) => {
      if (!node) return false;
      if (node.data === value) return true;

      return value < node.data ? search(node.left) : search(node.right);
    };

    return search(this.root);

    // Iterative approach below
    // ========================
    // let node = this.root;

    // for (;;) {
    //   if (!node) {
    //     return false;
    //   } else if (node.data === value) {
    //     return true;
    //   } else if (value < node.data) {
    //     node = node.left;
    //   } else {
    //     node = node.right;
    //   }
    // }
  }

  #insertNode(newNode, currentNode = this.root) {
    if (newNode.data === currentNode.data) return currentNode;

    const direction = newNode.data < currentNode.data ? "left" : "right";
    const nextNode = currentNode[direction];
    if (nextNode === null) {
      currentNode[direction] = newNode;
      return;
    }

    currentNode[direction] = this.#insertNode(newNode, nextNode);
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.#insertNode(newNode);
    }

    return this;

    // Iterative algorithm below
    // =========================
    // const newNode = new Node(value);
    // if (this.root === null) {
    //   this.root = newNode;
    //   return this;
    // }

    // let currentNode = this.root;
    // while (currentNode) {
    //   if (value === currentNode.data) break;

    //   const nextNode = value < currentNode.data ? "left" : "right";
    //   if (currentNode[nextNode]) {
    //     currentNode = currentNode[nextNode];
    //   } else {
    //     currentNode[nextNode] = newNode;
    //   }
    // }

    // return this;
  }

  #getPredecessor(node) {
    while (node.right) node = node.right;
    return node;
  }

  #deleteNode(node = this.root, value) {
    // Node not found
    if (node === null) return null;

    // Search for Node
    if (value < node.data) {
      node.left = this.#deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.#deleteNode(node.right, value);
    } else {
      // Node found

      // 0-1 child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // 2 children
      const predecessor = this.#getPredecessor(node.left);
      node.data = predecessor.data;
      node.left = this.#deleteNode(node.left, predecessor.data);
    }

    // Updated node
    return node;
  }

  delete(value) {
    if (this.root !== null) {
      this.root = this.#deleteNode(this.root, value);
    }

    return this;

    // Iterative version:
    // =================
    // let parent = null;
    // let curr = this.root;

    // Search for value
    // while (curr && curr.data !== value) {
    //   parent = curr;
    //   curr = value < curr.data ? curr.left : curr.right;
    // }

    // // Value not found
    // if (curr === null) return this;

    // // 2 children
    // if (curr.left && curr.right) {
    //   // Find in-order predecessor
    //   let predParent = null;
    //   let pred = curr.left;

    //   while (pred.right) {
    //     predParent = pred;
    //     pred = pred.right;
    //   }

    //   curr.data = pred.data;
    //   parent = predParent;
    //   curr = pred;
    // }

    // // 1 or 0 child
    // const child = curr.left || curr.right || null;
    // if (!parent) {
    //   this.root = child;
    // } else if (parent.left === curr) {
    //   parent.left = child;
    // } else {
    //   parent.right = child;
    // }

    // return this;
  }

  #levelOrder(callback, queue = [this.root]) {
    const currentNode = queue.shift();
    if (!currentNode) return;

    callback(currentNode.data);
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);

    this.#levelOrder(callback, queue);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback must be a function");
    if (this.root === null) return;

    this.#levelOrder(callback);

    // Iterative:
    // ==========
    // const queue = [this.root];
    // while (queue.length > 0) {
    //   const currentNode = queue.shift();

    //   callback(currentNode.data);

    //   if (currentNode.left) queue.push(currentNode.left);
    //   if (currentNode.right) queue.push(currentNode.right);
    // }
  }
}
