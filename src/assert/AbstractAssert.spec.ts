import { describe, expect, it } from "bun:test";
import { AbstractAssert } from "./AbstractAssert";
import { assertThat } from "..";

describe("AbstractAssert", () => {
  class ConcreteAssert extends AbstractAssert {}
  const concreteAssert = (value: unknown) => new ConcreteAssert(value);

  class CoolClass {
    cool = true;
  }
  class UncoolClass {
    cool = false;
  }

  describe("isEqualTo", () => {
    it("should not throw when strictly equal", () => {
      assertThat(concreteAssert(true)).successfullyAsserts((a) =>
        a.isEqualTo(true)
      );
    });

    it("should not throw when deeply equal", () => {
      const nestedObject = () => ({ a: "0", b: { c: [1, 2, { d: "3" }] } });
      assertThat(concreteAssert(nestedObject())).successfullyAsserts((a) =>
        a.isEqualTo(nestedObject())
      );
    });

    it("should throw when not equal", () => {
      assertThat(concreteAssert({ a: 1 })).throwsAssertionError(
        (a) => a.isEqualTo({ a: 2 }),
        'Expected {"a": 1} to equal {"a": 2}'
      );
    });
  });

  describe("isNotEqualTo", () => {
    it("should not throw when not deeply equal", () => {
      assertThat(concreteAssert({ a: 1 })).successfullyAsserts((a) =>
        a.isNotEqualTo({ a: 2 })
      );
    });

    it("should throw when deeply equal", () => {
      assertThat(concreteAssert({ a: 1 })).throwsAssertionError(
        (a) => a.isNotEqualTo({ a: 1 }),
        'Expected {"a": 1} not to equal {"a": 1}'
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

  describe("isInstanceOf", () => {
    it("should not throw when instance of", () => {
      assertThat(concreteAssert({})).successfullyAsserts((a) =>
        a.isInstanceOf(Object)
      );
      assertThat(concreteAssert(new CoolClass())).successfullyAsserts((a) =>
        a.isInstanceOf(CoolClass)
      );
    });

    it("should throw when not instance of", () => {
      assertThat(concreteAssert(new UncoolClass())).throwsAssertionError(
        (a) => a.isInstanceOf(CoolClass),
        'Expected {"cool": false} to be an instance of CoolClass'
      );
    });
  });

  describe("isNotInstanceOf", () => {
    it("should not throw when not instance of", () => {
      assertThat(concreteAssert(new UncoolClass())).successfullyAsserts((a) =>
        a.isNotInstanceOf(CoolClass)
      );
    });

    it("should throw when instance of", () => {
      assertThat(concreteAssert(new CoolClass())).throwsAssertionError(
        (a) => a.isNotInstanceOf(CoolClass),
        'Expected {"cool": true} not to be an instance of CoolClass'
      );
    });
  });

  describe("isTruthy", () => {
    it("should not throw when truthy", () => {
      assertThat(concreteAssert(true)).successfullyAsserts((a) => a.isTruthy());
      assertThat(concreteAssert(1)).successfullyAsserts((a) => a.isTruthy());
      assertThat(concreteAssert(" ")).successfullyAsserts((a) => a.isTruthy());
    });

    it("should throw when not truthy", () => {
      assertThat(concreteAssert(false)).throwsAssertionError(
        (a) => a.isTruthy(),
        "Expected false to be truthy"
      );
      assertThat(concreteAssert(0)).throwsAssertionError(
        (a) => a.isTruthy(),
        "Expected 0 to be truthy"
      );
      assertThat(concreteAssert("")).throwsAssertionError(
        (a) => a.isTruthy(),
        'Expected "" to be truthy'
      );
    });
  });

  describe("isFalsy", () => {
    it("should not throw when falsy", () => {
      assertThat(concreteAssert(false)).successfullyAsserts((a) => a.isFalsy());
      assertThat(concreteAssert(0)).successfullyAsserts((a) => a.isFalsy());
      assertThat(concreteAssert("")).successfullyAsserts((a) => a.isFalsy());
    });

    it("should throw when not falsy", () => {
      assertThat(concreteAssert(true)).throwsAssertionError(
        (a) => a.isFalsy(),
        "Expected true to be falsy"
      );
      assertThat(concreteAssert(1)).throwsAssertionError(
        (a) => a.isFalsy(),
        "Expected 1 to be falsy"
      );
      assertThat(concreteAssert(" ")).throwsAssertionError(
        (a) => a.isFalsy(),
        'Expected " " to be falsy'
      );
    });
  });
});
