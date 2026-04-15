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

  it("Builds a tree from array with duplicates", () => {
    const tree = new Tree([5, 5, 3, 2]);
    expect(tree.root).toEqual({
      data: 3,
      left: { data: 2, left: null, right: null },
      right: { data: 5, left: null, right: null },
    });
  });

  it("Builds a tree with sub-trees", () => {
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

  it("Builds a sub-trees with sub-trees", () => {
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

  it("Returns true value is at top-level root", () => {
    const tree = new Tree([1]);
    expect(tree.includes(1)).toBe(true);
  });

  it("Returns true if value is in a subtree", () => {
    const tree = new Tree([0, 1, 2, 100]);
    expect(tree.includes(100)).toBe(true);
  });

  it("Returns false if value is not in tree", () => {
    const tree = new Tree([0, 1, 2, 3, 4, 5]);
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

  it("Does nothing if value is at left subtree", () => {
    const tree = new Tree([1, 2, 3]);
    tree.insert(1);
    expect(tree.root).toEqual({
      data: 2,
      left: { data: 1, left: null, right: null },
      right: { data: 3, left: null, right: null },
    });
  });

  it("Does nothing if value is at right subtree", () => {
    const tree = new Tree([1, 2, 3]);
    tree.insert(3);
    expect(tree.root).toEqual({
      data: 2,
      left: { data: 1, left: null, right: null },
      right: { data: 3, left: null, right: null },
    });
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

  it("Inserts value on left subtree", () => {
    const tree = new Tree([3]);
    tree.insert(2);
    expect(tree.root).toEqual({
      data: 3,
      left: { data: 2, left: null, right: null },
      right: null,
    });
  });

  it("Inserts value on right subtree", () => {
    const tree = new Tree([4]);
    tree.insert(5);
    expect(tree.root).toEqual({
      data: 4,
      left: null,
      right: { data: 5, left: null, right: null },
    });
  });
});
