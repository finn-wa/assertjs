import { describe, expect, it } from "bun:test";
import { BooleanAssert } from "./BooleanAssert";

describe("BooleanAssert", () => {
  const assertThat = (value: boolean) => new BooleanAssert(value);

  describe("isEqualTo", () => {
    it("should not throw when equal", () => {
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

  describe("isTrue", () => {
    it("should not throw when true", () => {
      assertThat(true).isTrue();
    });

    it("should throw when false", () => {
      expect(() => assertThat(false).isTrue()).toThrow("Expected false to be true");
    });
  });

  describe("isFalse", () => {
    it("should not throw when false", () => {
      assertThat(false).isFalse();
    });

    it("should throw when true", () => {
      expect(() => assertThat(true).isFalse()).toThrow("Expected true to be false");
    });
  });
});
