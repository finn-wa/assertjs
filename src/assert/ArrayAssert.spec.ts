import { describe, expect, it } from "bun:test";
import { ArrayAssert } from "./ArrayAssert";

describe("ArrayAssert", () => {
  const arrayAssert = (value: unknown[]) => new ArrayAssert(value);

  it("should create", () => {
    expect(arrayAssert([])).toBeDefined();
  });
});
