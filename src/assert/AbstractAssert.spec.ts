import { describe, expect, it } from "bun:test";
import { AbstractAssert } from "./AbstractAssert";
import { assertThat } from "..";

describe("AbstractAssert", () => {
  class ConcreteAssert<T> extends AbstractAssert<T> {}
  function abstractAssert<T>(value: T): ConcreteAssert<T> {
    return new ConcreteAssert(value);
  }

  class CoolClass {
    cool = true;
  }
  class UncoolClass {
    uncool = true;
  }

  describe("isEqualTo", () => {
    it("should not throw when strictly equal", () => {
      assertThat(abstractAssert(true)).successfullyAsserts((a) =>
        a.isEqualTo(true)
      );
    });

    it("should not throw when deeply equal", () => {
      const nestedObject = () => ({ a: "0", b: { c: [1, 2, { d: "3" }] } });
      assertThat(abstractAssert(nestedObject())).successfullyAsserts((a) =>
        a.isEqualTo(nestedObject())
      );
    });

    it("should throw when not equal", () => {
      assertThat(abstractAssert({ a: 1 })).throwsAssertionError(
        (a) => a.isEqualTo({ a: 2 }),
        'Expected {"a": 1} to equal {"a": 2}'
      );
    });
  });

  describe("isNotEqualTo", () => {
    it("should not throw when not deeply equal", () => {
      assertThat(abstractAssert({ a: 1 })).successfullyAsserts((a) =>
        a.isNotEqualTo({ a: 2 })
      );
    });

    it("should throw when deeply equal", () => {
      assertThat(abstractAssert({ a: 1 })).throwsAssertionError(
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
      assertThat(abstractAssert({})).successfullyAsserts((a) =>
        a.isInstanceOf(Object)
      );
      assertThat(abstractAssert(new CoolClass())).successfullyAsserts((a) =>
        a.isInstanceOf(CoolClass)
      );
    });

    it("should throw when not instance of", () => {
      assertThat(
        abstractAssert(new UncoolClass() as unknown)
      ).throwsAssertionError(
        (a) => a.isInstanceOf(CoolClass),
        'Expected {"cool": false} to be an instance of CoolClass'
      );
    });

    it("should narrow the value type", () => {
      const unknownValue: unknown = new CoolClass();
      const mustBeCool = (_: AbstractAssert<CoolClass>) => {};
      // @ts-expect-error - unknown if cool
      mustBeCool(abstractAssert(unknownValue));
      // no error - confirmed cool
      mustBeCool(abstractAssert(unknownValue).isInstanceOf(CoolClass));
    });
  });

  describe("isNotInstanceOf", () => {
    it("should not throw when not instance of", () => {
      assertThat(abstractAssert(new UncoolClass())).successfullyAsserts((a) =>
        a.isNotInstanceOf(CoolClass)
      );
    });

    it("should throw when instance of", () => {
      assertThat(abstractAssert(new CoolClass())).throwsAssertionError(
        (a) => a.isNotInstanceOf(CoolClass),
        'Expected {"cool": true} not to be an instance of CoolClass'
      );
    });

    it("should narrow the value type", () => {
      const unknownValue = new CoolClass() as CoolClass | UncoolClass;
      const mustBeCool = (_: AbstractAssert<CoolClass>) => {};
      // @ts-expect-error - could be uncool
      mustBeCool(abstractAssert(unknownValue));
      // no error - confirmed cool
      mustBeCool(abstractAssert(unknownValue).isNotInstanceOf(UncoolClass));
    });
  });

  describe("isTruthy", () => {
    it("should not throw when truthy", () => {
      assertThat(abstractAssert(true)).successfullyAsserts((a) => a.isTruthy());
      assertThat(abstractAssert(1)).successfullyAsserts((a) => a.isTruthy());
      assertThat(abstractAssert(" ")).successfullyAsserts((a) => a.isTruthy());
    });

    it("should throw when not truthy", () => {
      assertThat(abstractAssert(false)).throwsAssertionError(
        (a) => a.isTruthy(),
        "Expected false to be truthy"
      );
      assertThat(abstractAssert(0)).throwsAssertionError(
        (a) => a.isTruthy(),
        "Expected 0 to be truthy"
      );
      assertThat(abstractAssert("")).throwsAssertionError(
        (a) => a.isTruthy(),
        'Expected "" to be truthy'
      );
    });
  });

  describe("isFalsy", () => {
    it("should not throw when falsy", () => {
      assertThat(abstractAssert(false)).successfullyAsserts((a) => a.isFalsy());
      assertThat(abstractAssert(0)).successfullyAsserts((a) => a.isFalsy());
      assertThat(abstractAssert("")).successfullyAsserts((a) => a.isFalsy());
    });

    it("should throw when not falsy", () => {
      assertThat(abstractAssert(true)).throwsAssertionError(
        (a) => a.isFalsy(),
        "Expected true to be falsy"
      );
      assertThat(abstractAssert(1)).throwsAssertionError(
        (a) => a.isFalsy(),
        "Expected 1 to be falsy"
      );
      assertThat(abstractAssert(" ")).throwsAssertionError(
        (a) => a.isFalsy(),
        'Expected " " to be falsy'
      );
    });
  });
});
