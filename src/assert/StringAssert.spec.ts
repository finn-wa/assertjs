import { describe, expect, it } from "bun:test";
import { StringAssert } from "./StringAssert";

describe("StringAssert", () => {
  it("should create", () => {
    expect(new StringAssert("")).toBeDefined();
  });
});
