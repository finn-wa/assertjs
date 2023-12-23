import { describe, expect, it } from "bun:test";
import { AbstractAssert } from "./AbstractAssert";
import { assertThat } from "..";
import { AssertionError } from "../errors/AssertionError";

describe("AbstractAssert", () => {
  class Assert<T> extends AbstractAssert<T> {}
  function abstractAssert<T>(value: T): AbstractAssert<T> {
    return new Assert(value);
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
      assertThat(abstractAssert({ x: 1 })).throwsAssertionError(
        (a) => a.isEqualTo({ x: 2 }),
        'Expected {"x": 1} to equal {"x": 2}'
      );
    });
  });

  describe("isNotEqualTo", () => {
    it("should not throw when not deeply equal", () => {
      assertThat(abstractAssert({ x: 1 })).successfullyAsserts((a) =>
        a.isNotEqualTo({ x: 2 })
      );
    });

    it("should throw when deeply equal", () => {
      assertThat(abstractAssert({ x: 1 })).throwsAssertionError(
        (a) => a.isNotEqualTo({ x: 1 }),
        'Expected {"x": 1} not to equal {"x": 1}'
      );
    });
  });

  describe("isSameAs", () => {
    it("should not throw when same", () => {
      const value = { b: 2 };
      assertThat(abstractAssert(value)).successfullyAsserts((a) =>
        a.isSameAs(value)
      );
    });

    it("should throw when not same", () => {
      assertThat(abstractAssert({ x: 2 })).throwsAssertionError(
        (a) => a.isSameAs({ x: 2 }),
        'Expected {"x": 2} to be the same as {"x": 2} using strict equality'
      );
    });
  });

  describe("isNotSameAs", () => {
    it("should not throw when not same", () => {
      assertThat({ x: 1 }).isNotSameAs({ x: 1 });
    });

    it("should throw when same", () => {
      const value = { x: 1 };
      expect(() => assertThat(value).isNotSameAs(value)).toThrow(
        'Expected {"x": 1} not to be the same as the provided value using strict equality'
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
        'Expected {"uncool": true} to be an instance of CoolClass'
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

  describe("isNull", () => {
    it("should throw when not null", () => {
      assertThat(abstractAssert(undefined as unknown)).throwsAssertionError(
        (a) => a.isNull(),
        "Expected undefined to be null"
      );
    });

    it("should not throw when null", () => {
      assertThat(abstractAssert(null)).successfullyAsserts((a) => a.isNull());
    });
  });

  describe("isNotNull", () => {
    it("should not throw when not null", () => {
      assertThat(abstractAssert(undefined)).successfullyAsserts((a) =>
        a.isNotNull()
      );
      assertThat(abstractAssert(1)).successfullyAsserts((a) => a.isNotNull());
    });

    it("should throw when null", () => {
      assertThat(abstractAssert(null)).throwsAssertionError(
        (a) => a.isNotNull(),
        "Expected value not to be null"
      );
    });
  });

  describe("isDefined", () => {
    it("should not throw when defined", () => {
      assertThat(abstractAssert(1)).successfullyAsserts((a) => a.isDefined());
      assertThat(abstractAssert(null)).successfullyAsserts((a) =>
        a.isDefined()
      );
    });

    it("should throw when not defined", () => {
      assertThat(abstractAssert(undefined)).throwsAssertionError(
        (a) => a.isDefined(),
        "Expected value not to be undefined"
      );
    });
  });

  describe("isUndefined", () => {
    it("should not throw when undefined", () => {
      assertThat(abstractAssert(undefined)).successfullyAsserts((a) =>
        a.isUndefined()
      );
    });

    it("should throw when not undefined", () => {
      assertThat(abstractAssert(null as unknown)).throwsAssertionError(
        (a) => a.isUndefined(),
        "Expected null to be undefined"
      );
    });
  });

  describe("satisfies", () => {
    it("should not throw when the value satisfies the predicate", () => {
      assertThat(abstractAssert(1)).successfullyAsserts((a) =>
        a.satisfies((v) => v === 1)
      );
    });

    it("should throw when the value does not satisfy the predicate", () => {
      assertThat(abstractAssert(2)).throwsAssertionError(
        (a) => a.satisfies((v) => v === 1),
        "Expected 2 to satisfy the predicate"
      );
    });

    it("should not throw when the function returns void", () => {
      assertThat(abstractAssert(1)).successfullyAsserts((a) =>
        a.satisfies(() => {})
      );
    });

    it("should not throw when the function returns an assertion object", () => {
      assertThat(abstractAssert(1)).successfullyAsserts((a) =>
        a.satisfies(() => abstractAssert(1).isEqualTo(1))
      );
    });

    it("should propagate any errors thrown by the function", () => {
      assertThat(abstractAssert(1)).throwsAssertionError(
        (a) =>
          a.satisfies(() => {
            throw new AssertionError("bad value");
          }),
        "bad value"
      );
    });
  });
});
