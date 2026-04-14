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
    const search = (root) => {
      if (!root) return false;
      if (root.data === value) return true;

      return root.data > value ? search(root.left) : search(root.right);
    };

    return search(this.root);
  }
}
