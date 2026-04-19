import { Tree } from "./tree.js";

describe("Tree Constructor", () => {
  it("Tree Constructor exist", () => {
    expect(Tree).toBeDefined();
    expect(typeof Tree).toBe("function");
    const object = new Tree();
    expect(object instanceof Tree).toBe(true);
  });

  it("Assigns a root attribute", () => {
    const tree = new Tree();
    expect(Object.hasOwn(tree, "root")).toBe(true);
  });

  it("Sets tree to null if no array", () => {
    const tree = new Tree();
    expect(tree.root).toBeNull();
  });

  it("Sets tree to null if empty array", () => {
    const tree = new Tree([]);
    expect(tree.root).toBeNull();
  });

  it("Builds a tree from sorted array", () => {
    const tree = new Tree([0, 1, 2]);
    expect(tree.root).toEqual({
      data: 1,
      left: { data: 0, left: null, right: null },
      right: { data: 2, left: null, right: null },
    });
  });

  it("Builds a tree from unsorted array", () => {
    const tree = new Tree([7, 9, 8]);
    expect(tree.root).toEqual({
      data: 8,
      left: { data: 7, left: null, right: null },
      right: { data: 9, left: null, right: null },
    });
  });

  it("Builds a tree without any duplicates from array", () => {
    const tree = new Tree([5, 5, 3, 2]);
    expect(tree.root).toEqual({
      data: 3,
      left: { data: 2, left: null, right: null },
      right: { data: 5, left: null, right: null },
    });
  });

  it("Builds a tree with leaves", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: { data: 2, left: null, right: null },
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Builds sub-trees with leaves", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: { data: 2, left: null, right: null },
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });
});

describe("includes method", () => {
  it("includes method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "includes")).toBe(true);
    expect(typeof Tree.prototype.includes).toBe("function");
  });

  it("Returns false for empty tree", () => {
    const tree = new Tree();
    expect(tree.includes()).toBe(false);
  });

  let tree;
  beforeAll(() => {
    tree = new Tree([1, 2, 3, 4, 5]);
  });

  it("Returns true value is at root", () => {
    expect(tree.includes(3)).toBe(true);
  });

  it("Returns true if value is in a leaf", () => {
    expect(tree.includes(2)).toBe(true);
  });

  it("Returns true if value is in a subtree", () => {
    expect(tree.includes(1)).toBe(true);
  });

  it("Returns false if value is not in tree", () => {
    expect(tree.includes(6)).toBe(false);
  });
});

describe("insert method", () => {
  it("insert method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "insert")).toBe(true);
    expect(typeof Tree.prototype.insert).toBe("function");
  });

  it("Returns the tree", () => {
    const tree = new Tree();
    expect(tree.insert()).toBe(tree);
  });

  it("Inserts value at root on empty tree", () => {
    const tree = new Tree();
    tree.insert(1);
    expect(tree.root).toEqual({ data: 1, left: null, right: null });
  });

  it("Does nothing if value is at root", () => {
    const tree = new Tree([2]);
    tree.insert(2);
    expect(tree.root).toEqual({ data: 2, left: null, right: null });
  });

  it("Does nothing if value is at middle of the tree", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    tree.insert(1);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: { data: 2, left: null, right: null },
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Inserts value on left leaf", () => {
    const tree = new Tree([3]);
    tree.insert(2);
    expect(tree.root).toEqual({
      data: 3,
      left: { data: 2, left: null, right: null },
      right: null,
    });
  });

  it("Inserts value on right leaf", () => {
    const tree = new Tree([4]);
    tree.insert(5);
    expect(tree.root).toEqual({
      data: 4,
      left: null,
      right: { data: 5, left: null, right: null },
    });
  });
});

describe("delete method", () => {
  it("delete method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "delete")).toBe(true);
    expect(typeof Tree.prototype.delete).toBe("function");
  });

  it("Does nothing if tree is empty", () => {
    const tree = new Tree();
    const initialState = tree.root;
    tree.delete(1);
    tree.delete();
    tree.delete(null);
    expect(tree.root).toEqual(initialState);
  });

  it("Set the root to null if is the only node", () => {
    const tree = new Tree([1]);
    tree.delete(1);
    expect(tree.root).toBeNull();
  });

  let tree;
  beforeEach(() => {
    tree = new Tree([1, 2, 3, 4, 5]);
  });

  it("Does nothing if value is not in tree", () => {
    tree.delete(0);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: { data: 2, left: null, right: null },
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Removes node with 2 children and in-order predecessor inherits", () => {
    tree.delete(3);
    expect(tree.root).toEqual({
      data: 2,
      left: { data: 1, left: null, right: null },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Removes node with one child", () => {
    tree.delete(1);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 2,
        left: null,
        right: null,
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Removes node with no child", () => {
    tree.delete(2);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: null,
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });
});

describe("levelOrderForEach method", () => {
  it("levelOrderForEach method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "levelOrderForEach")).toBe(true);
    expect(typeof Tree.prototype.levelOrderForEach).toBe("function");
  });

  it("Throws Error if no callback provided", () => {
    const tree = new Tree();
    expect(() => tree.levelOrderForEach()).toThrow(Error);
    expect(() => tree.levelOrderForEach({})).toThrow(Error);
    expect(() => tree.levelOrderForEach([])).toThrow(Error);
    expect(() => tree.levelOrderForEach(1)).toThrow(Error);
    expect(() => tree.levelOrderForEach("")).toThrow(Error);
    expect(() => tree.levelOrderForEach(1n)).toThrow(Error);
    expect(() => tree.levelOrderForEach(true)).toThrow(Error);
    expect(() => tree.levelOrderForEach(null)).toThrow(Error);
  });

  it("Does not throw if callback provided", () => {
    const tree = new Tree();
    expect(() => tree.levelOrderForEach(() => {})).not.toThrow();
  });

  let callback;
  beforeAll(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    callback.mockReset();
  });

  it("Does not call if root is null", () => {
    const tree = new Tree();
    tree.levelOrderForEach(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it("Calls the callback", () => {
    const tree = new Tree([1]);
    tree.levelOrderForEach(callback);

    expect(callback).toHaveBeenCalled();
  });

  it("Calls callback with value", () => {
    const tree = new Tree([1]);
    tree.levelOrderForEach(callback);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it("Correctly calls for 1 level", () => {
    const tree = new Tree([1, 2, 3]);
    tree.levelOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[2], [1], [3]]);
  });

  it("Correctly calls 2 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    tree.levelOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[3], [1], [4], [2], [5]]);
  });

  it("Correctly calls 3 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    tree.levelOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[4], [2], [6], [1], [3], [5], [7]]);
  });
});

describe("inOrderForEach method", () => {
  it("inOrderForEach method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "inOrderForEach")).toBe(true);
    expect(typeof Tree.prototype.inOrderForEach).toBe("function");
  });

  it("Throws Error if no callback provided", () => {
    const tree = new Tree();
    expect(() => tree.inOrderForEach()).toThrow(Error);
    expect(() => tree.inOrderForEach({})).toThrow(Error);
    expect(() => tree.inOrderForEach([])).toThrow(Error);
    expect(() => tree.inOrderForEach(1)).toThrow(Error);
    expect(() => tree.inOrderForEach("")).toThrow(Error);
    expect(() => tree.inOrderForEach(1n)).toThrow(Error);
    expect(() => tree.inOrderForEach(true)).toThrow(Error);
    expect(() => tree.inOrderForEach(null)).toThrow(Error);
  });

  it("Does not throw if callback provided", () => {
    const tree = new Tree();
    expect(() => tree.inOrderForEach(() => {})).not.toThrow();
  });

  let callback;
  beforeAll(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    callback.mockReset();
  });

  it("Does not call if root is null", () => {
    const tree = new Tree();
    tree.inOrderForEach(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it("Calls the callback", () => {
    const tree = new Tree([1]);
    tree.inOrderForEach(callback);

    expect(callback).toHaveBeenCalled();
  });

  it("Calls callback with value", () => {
    const tree = new Tree([1]);
    tree.inOrderForEach(callback);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it("Correctly calls for 1 level", () => {
    const tree = new Tree([1, 2, 3]);
    tree.inOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[1], [2], [3]]);
  });

  it("Correctly calls 2 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    tree.inOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[1], [2], [3], [4], [5]]);
  });

  it("Correctly calls 3 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    tree.inOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[1], [2], [3], [4], [5], [6], [7]]);
  });
});

describe("preOrderForEach method", () => {
  it("preOrderForEach method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "preOrderForEach")).toBe(true);
    expect(typeof Tree.prototype.preOrderForEach).toBe("function");
  });

  it("Throws Error if no callback provided", () => {
    const tree = new Tree();
    expect(() => tree.preOrderForEach()).toThrow(Error);
    expect(() => tree.preOrderForEach({})).toThrow(Error);
    expect(() => tree.preOrderForEach([])).toThrow(Error);
    expect(() => tree.preOrderForEach(1)).toThrow(Error);
    expect(() => tree.preOrderForEach("")).toThrow(Error);
    expect(() => tree.preOrderForEach(1n)).toThrow(Error);
    expect(() => tree.preOrderForEach(true)).toThrow(Error);
    expect(() => tree.preOrderForEach(null)).toThrow(Error);
  });

  it("Does not throw if callback provided", () => {
    const tree = new Tree();
    expect(() => tree.preOrderForEach(() => {})).not.toThrow();
  });

  let callback;
  beforeAll(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    callback.mockReset();
  });

  it("Does not call if root is null", () => {
    const tree = new Tree();
    tree.preOrderForEach(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it("Calls the callback", () => {
    const tree = new Tree([1]);
    tree.preOrderForEach(callback);

    expect(callback).toHaveBeenCalled();
  });

  it("Calls callback with value", () => {
    const tree = new Tree([1]);
    tree.preOrderForEach(callback);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it("Correctly calls for 1 level", () => {
    const tree = new Tree([1, 2, 3]);
    tree.preOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[2], [1], [3]]);
  });

  it("Correctly calls 2 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    tree.preOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[3], [1], [2], [4], [5]]);
  });

  it("Correctly calls 3 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    tree.preOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[4], [2], [1], [3], [6], [5], [7]]);
  });
});

describe("postOrderForEach method", () => {
  it("postOrderForEach method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "postOrderForEach")).toBe(true);
    expect(typeof Tree.prototype.postOrderForEach).toBe("function");
  });

  it("Throws Error if no callback provided", () => {
    const tree = new Tree();
    expect(() => tree.postOrderForEach()).toThrow(Error);
    expect(() => tree.postOrderForEach({})).toThrow(Error);
    expect(() => tree.postOrderForEach([])).toThrow(Error);
    expect(() => tree.postOrderForEach(1)).toThrow(Error);
    expect(() => tree.postOrderForEach("")).toThrow(Error);
    expect(() => tree.postOrderForEach(1n)).toThrow(Error);
    expect(() => tree.postOrderForEach(true)).toThrow(Error);
    expect(() => tree.postOrderForEach(null)).toThrow(Error);
  });

  it("Does not throw if callback provided", () => {
    const tree = new Tree();
    expect(() => tree.postOrderForEach(() => {})).not.toThrow();
  });

  let callback;
  beforeAll(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    callback.mockReset();
  });

  it("Does not call if root is null", () => {
    const tree = new Tree();
    tree.postOrderForEach(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it("Calls the callback", () => {
    const tree = new Tree([1]);
    tree.postOrderForEach(callback);

    expect(callback).toHaveBeenCalled();
  });

  it("Calls callback with value", () => {
    const tree = new Tree([1]);
    tree.postOrderForEach(callback);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it("Correctly calls for 1 level", () => {
    const tree = new Tree([1, 2, 3]);
    tree.postOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[1], [3], [2]]);
  });

  it("Correctly calls 2 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    tree.postOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[2], [1], [5], [4], [3]]);
  });

  it("Correctly calls 3 level", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    tree.postOrderForEach(callback);

    expect(callback.mock.calls).toEqual([[1], [3], [2], [5], [7], [6], [4]]);
  });
});

describe("height method", () => {
  it("height method exits", () => {
    expect(Object.hasOwn(Tree.prototype, "height")).toBe(true);
    expect(typeof Tree.prototype.height).toBe("function");
  });

  it("Returns undefined if empty tree", () => {
    const tree = new Tree();
    expect(tree.height(1)).toBeUndefined();
  });

  it("Returns undefined if value not in tree", () => {
    const tree = new Tree([1]);
    expect(tree.height(2)).toBeUndefined();
  });

  it("Returns 0 for lone root", () => {
    const tree = new Tree([1]);
    expect(tree.height(1)).toBe(0);
  });

  it("Returns 0 for child leaf", () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.height(1)).toBe(0);
  });

  it("Returns 1 for root with 1 child leaf", () => {
    const tree = new Tree([1, 2]);
    expect(tree.height(1)).toBe(1);
  });

  it("Returns 1 for root with 2 child leaves", () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.height(2)).toBe(1);
  });

  it("Returns 2 for root with 1 grandchild leaf", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    expect(tree.height(3)).toBe(2);
  });

  it("Returns 2 for root with 2 grandchild leaves", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    expect(tree.height(4)).toBe(2);
  });

  it("Returns 2 for middle node with 1 grandchild leaf", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.height(2)).toBe(2);
  });

  it("Returns 3 for root with 1 great-grandchild leaf ", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.height(5)).toBe(3);
  });
});

describe("depth method", () => {
  it("depth method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "depth")).toBe(true);
    expect(typeof Tree.prototype.depth).toBe("function");
  });

  it("Returns undefined for empty tree", () => {
    const tree = new Tree();
    expect(tree.depth()).toBeUndefined();
  });

  it("Returns undefined for value not in tree", () => {
    const tree = new Tree([1]);
    expect(tree.depth(2)).toBeUndefined();
  });

  it("Returns 0 for value at root", () => {
    const tree = new Tree([1]);
    expect(tree.depth(1)).toBe(0);
  });

  it("Returns 1 for value one deep", () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.depth(3)).toBe(1);
  });

  it("Returns 1 for value one deep in middle of tree ", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    expect(tree.depth(5)).toBe(2);
  });

  it("Returns 2 for value two deep", () => {
    const tree = new Tree([1, 2, 3, 4, 5]);
    expect(tree.depth(5)).toBe(2);
  });

  it("Returns 3 for value three deep", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.depth(9)).toBe(3);
  });
});

describe("isBalanced method", () => {
  it("isBalanced method exists", () => {
    expect(Object.hasOwn(Tree.prototype, "isBalanced")).toBe(true);
    expect(typeof Tree.prototype.isBalanced).toBe("function");
  });

  it("Returns true for no tree", () => {
    const tree = new Tree();
    expect(tree.isBalanced()).toBe(true);
  });

  it("Returns true for lone root", () => {
    const tree = new Tree([1]);
    expect(tree.isBalanced()).toBe(true);
  });

  it("Returns true for tree with 1 leaf", () => {
    const tree = new Tree([1, 2]);
    expect(tree.isBalanced()).toBe(true);
  });

  it("Returns true for tree with subtrees", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.isBalanced()).toBe(true);
  });

  it("Returns false for root containing 1 left subtree with a leaf, but no right subtree", () => {
    const tree = new Tree([3]);
    tree.insert(1);
    tree.insert(2);
    expect(tree.isBalanced()).toBe(false);
  });

  it("Returns false when the height difference between left and right is over 1", () => {
    const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
    tree.insert(8);
    tree.insert(9);
    expect(tree.isBalanced()).toBe(false);
  });
});

describe("rebalance method", () => {
  it("rebalance methods exists", () => {
    expect(Object.hasOwn(Tree.prototype, "rebalance")).toBe(true);
    expect(typeof Tree.prototype.rebalance).toBe("function");
  });

  it("Does nothing for no tree", () => {
    const tree = new Tree();
    expect(tree.root).toBeNull();

    tree.rebalance();

    expect(tree.root).toBeNull();
  });

  it("Does nothing for balanced tree", () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.root).toEqual({
      data: 2,
      left: { data: 1, left: null, right: null },
      right: { data: 3, left: null, right: null },
    });

    tree.rebalance();

    expect(tree.root).toEqual({
      data: 2,
      left: { data: 1, left: null, right: null },
      right: { data: 3, left: null, right: null },
    });
  });

  it("Balances tree that is skew right", () => {
    const tree = new Tree([1]);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.isBalanced()).toBe(false);
    expect(tree.root).toEqual({
      data: 1,
      left: null,
      right: {
        data: 2,
        left: null,
        right: {
          data: 3,
          left: null,
          right: {
            data: 4,
            left: null,
            right: { data: 5, left: null, right: null },
          },
        },
      },
    });

    tree.rebalance();

    expect(tree.isBalanced()).toBe(true);
    expect(tree.root).toEqual({
      data: 3,
      left: {
        data: 1,
        left: null,
        right: { data: 2, left: null, right: null },
      },
      right: {
        data: 4,
        left: null,
        right: { data: 5, left: null, right: null },
      },
    });
  });

  it("Balances tree that is skew left", () => {
    const tree = new Tree([5]);
    tree.insert(4);
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);

    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  it("Balances tree with unbalanced subtrees", () => {
    const tree = new Tree([1, 6, 7]);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });
});

describe("Driver script", () => {
  const getRandomValuesArray = (length = 10, minValue = 0, maxValue = 100) =>
    Array.from({ length: length }, () =>
      Math.round(Math.random() * maxValue + minValue)
    );
  const tree = new Tree(getRandomValuesArray());
  const printCallback = jest.spyOn(console, "log");

  afterEach(() => printCallback.mockReset());

  it("generates balanced tree", () => {
    expect(tree.isBalanced()).toBe(true);
  });

  it("prints out elements in level", () => {
    tree.levelOrderForEach(console.log);

    const values = [];
    tree.levelOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in pre", () => {
    tree.preOrderForEach(console.log);

    const values = [];
    tree.preOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in post", () => {
    tree.postOrderForEach(console.log);

    const values = [];
    tree.postOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in order", () => {
    tree.inOrderForEach(console.log);

    const values = [];
    tree.inOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
    console.log(values);
  });

  it("unbalances the tree", () => {
    const over100Values = getRandomValuesArray(5, 100);
    over100Values.forEach((value) => {
      tree.insert(value);
    });

    expect(tree.isBalanced()).toBe(false);
  });

  it("rebalance the tree", () => {
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  it("prints out elements in level", () => {
    tree.levelOrderForEach(console.log);

    const values = [];
    tree.levelOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in pre", () => {
    tree.preOrderForEach(console.log);

    const values = [];
    tree.preOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in post", () => {
    tree.postOrderForEach(console.log);

    const values = [];
    tree.postOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });

  it("prints out elements in order", () => {
    tree.inOrderForEach(console.log);

    const values = [];
    tree.inOrderForEach((value) => values.push(value));

    expect(printCallback.mock.calls.map((call) => call[0])).toEqual(values);
  });
});
