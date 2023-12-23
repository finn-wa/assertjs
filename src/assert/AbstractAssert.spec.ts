import { describe, expect, it } from "bun:test";
import { AbstractAssert } from "./AbstractAssert";

describe("AbstractAssert", () => {
  class TestAssert extends AbstractAssert {}

  const assertThat = (value: unknown) => new TestAssert(value);

  describe("isEqualTo", () => {
    it("should not throw when equal", () => {
      assertThat("beep").isEqualTo("beep");
      assertThat(true).isEqualTo(true);
    });

    it("should throw when not equal", () => {
      expect(() => assertThat(true).isEqualTo(false)).toThrow(
        "Expected true to be equal to false"
      );
    });
  });

  describe("isNotEqualTo", () => {
    it("should not throw when not equal", () => {
      assertThat(true).isNotEqualTo(false);
    });

    it("should throw when equal", () => {
      expect(() => assertThat(true).isNotEqualTo(true)).toThrow(
        "Expected true to not be equal to true"
      );
    });
  });
});
