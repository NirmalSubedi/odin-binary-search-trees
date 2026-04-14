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
});
