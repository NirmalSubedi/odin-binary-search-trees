import { Node } from "../node.js";

it("Node constructor exists", () => {
  expect(Node).toBeDefined();
  expect(typeof Node).toBeDefined();
});

it("Instantiate objects", () => {
  const object = new Node();
  expect(object instanceof Node).toBe(true);
});

it("Assigns data, left, and right attributes to object", () => {
  const object = new Node();
  expect(Object.hasOwn(object, "data")).toBe(true);
  expect(Object.hasOwn(object, "left")).toBe(true);
  expect(Object.hasOwn(object, "right")).toBe(true);
});
