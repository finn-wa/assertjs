import { describe, expect, it } from "bun:test";
import { StringAssert } from "./StringAssert";

describe("StringAssert", () => {
  const stringAssert = (value: string) => new StringAssert(value);

  it("should create", () => {
    expect(stringAssert("")).toBeDefined();
  });
});
