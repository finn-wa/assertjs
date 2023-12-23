import { describe, expect, it } from "bun:test";
import { BooleanAssert } from "./BooleanAssert";
import { assertThat } from "..";

describe("BooleanAssert", () => {
  const booleanAssert = (value: boolean) => new BooleanAssert(value);

  describe("isTrue", () => {
    it("should not throw when true", () => {
      assertThat(booleanAssert(true)).successfullyAsserts((a) => a.isTrue());
    });

    it("should throw when false", () => {
      assertThat(booleanAssert(false)).throwsAssertionError(
        (a) => a.isTrue(),
        "Expected false to be true"
      );
    });
  });

  describe("isFalse", () => {
    it("should not throw when false", () => {
      assertThat(booleanAssert(false)).successfullyAsserts((a) => a.isFalse());
    });

    it("should throw when true", () => {
      assertThat(booleanAssert(true)).throwsAssertionError(
        (a) => a.isFalse(),
        "Expected true to be false"
      );
    });
  });
});
