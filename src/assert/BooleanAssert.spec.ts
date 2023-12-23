import { describe, expect, it } from "bun:test";
import { BooleanAssert } from "./BooleanAssert";
import { assertThat } from "..";

describe("BooleanAssert", () => {
  describe("isTrue", () => {
    it("should not throw when true", () => {
      assertThat(new BooleanAssert(true)).successfullyAsserts((a) =>
        a.isTrue()
      );
    });

    it("should throw when false", () => {
      assertThat(new BooleanAssert(false)).throwsAssertionError(
        (a) => a.isTrue(),
        "Expected false to be true"
      );
    });
  });

  describe("isFalse", () => {
    it("should not throw when false", () => {
      assertThat(new BooleanAssert(false)).successfullyAsserts((a) =>
        a.isFalse()
      );
    });

    it("should throw when true", () => {
      assertThat(new BooleanAssert(true)).throwsAssertionError(
        (a) => a.isFalse(),
        "Expected true to be false"
      );
    });
  });
});
