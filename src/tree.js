import { Node } from "./node.js";

export class Tree {
  #sortArray(array = []) {
    if (array.length === 0) return [];
    if (array.length === 1) return array;

    const leftHalf = this.#sortArray(array.slice(0, array.length / 2));
    const rightHalf = this.#sortArray(array.slice(array.length / 2));

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
    const uniques = [];

    for (let i = 0; i < array.length; ++i) {
      const num = array[i];
      const nextNum = array[i + 1];

      if (nextNum === num) continue;
      uniques.push(num);
    }

    return uniques;
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
    const sorted = this.#sortArray(array);
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
}

const tree = new Tree([3, 14, 5, 1, 5, 1, 51, 5, 7, 8, 83, 1]);
tree.prettyPrint();
console.log(tree.root);
