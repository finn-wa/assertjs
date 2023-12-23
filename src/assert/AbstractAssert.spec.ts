import { describe, expect, it } from "bun:test";
import { AbstractAssert } from "./AbstractAssert";
import { assertThat } from "..";

describe("AbstractAssert", () => {
  class ConcreteAssert extends AbstractAssert {}
  const concreteAssert = (value: unknown) => new ConcreteAssert(value);

  describe("isEqualTo", () => {
    it("should not throw when equal", () => {
      assertThat(concreteAssert(true)).successfullyAsserts((a) =>
        a.isEqualTo(true)
      );
    });

    it("should throw when not equal", () => {});
  });

  describe("isEqualTo", () => {
    it("should not throw when equal", () => {
      assertThat(concreteAssert(true)).successfullyAsserts((a) =>
        a.isEqualTo(true)
      );
    });

    it("should throw when not equal", () => {
      assertThat(concreteAssert(true)).throwsAssertionError(
        (a) => a.isEqualTo(false),
        "Expected true to equal false"
      );
    });
  });

  describe("isNotEqualTo", () => {
    it("should not throw when not equal", () => {
      assertThat(concreteAssert(true)).successfullyAsserts((a) =>
        a.isNotEqualTo(false)
      );
    });

    it("should throw when equal", () => {
      assertThat(concreteAssert(true)).throwsAssertionError(
        (a) => a.isNotEqualTo(true),
        "Expected true not to equal true"
      );
    });
  });

  describe("isSameAs", () => {
    it("should not throw when same", () => {
      const value = {};
      assertThat(value).isSameAs(value);
    });

    it("should throw when not same", () => {
      expect(() => assertThat({}).isSameAs({})).toThrow(
        "Expected {} to be the same as {} using strict equality"
      );
    });
  });

  describe("describedAs", () => {
    it("should use the description in the error message if set", () => {
      expect(() =>
        assertThat(true).describedAs("has to be true").isEqualTo(false)
      ).toThrow("has to be true: Expected true to equal false");
    });

    it("should use the default description in the error message if not set", () => {
      expect(() => assertThat(true).isEqualTo(false)).toThrow(
        "Expected true to equal false"
      );
    });
  });
});