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
});
