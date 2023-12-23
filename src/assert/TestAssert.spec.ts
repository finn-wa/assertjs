import { describe, expect, it } from "bun:test";
import { TestAssert } from "./TestAssert";
import { AbstractAssert } from "./AbstractAssert";

describe("TestAssert", () => {
  function testAssert() {
    return new TestAssert(new AbstractAssert(1));
  }

  describe("successfullyAsserts", () => {
    it("should not throw when assertion succeeds", () => {
      testAssert().successfullyAsserts((a) => a.isEqualTo(1));
    });

    it("should throw when the assertion does not return an assert object with the same value", () => {
      expect(() =>
        testAssert().successfullyAsserts(() => new AbstractAssert(2))
      ).toThrow(
        "Expected the returned assert object to contain the same value as the original"
      );
    });

    it("should throw the assertion error when assertion fails", () => {
      expect(() =>
        testAssert().successfullyAsserts((a) => a.isEqualTo(2))
      ).toThrow(
        'Expected assertion to succeed, but it failed with error:\n"Expected 1 to equal 2"'
      );
    });
  });

  describe("throwsAssertionError", () => {
    it("should not throw when assertion throws an AssertionError with the provided message", () => {
      testAssert().throwsAssertionError(
        (a) => a.isEqualTo(2),
        "Expected 1 to equal 2"
      );
    });

    it("should throw when assertion succeeds", () => {
      expect(() =>
        testAssert().throwsAssertionError((a) => a.isEqualTo(1), "error")
      ).toThrow(
        "Expected assertion to throw an AssertionError, but it succeeded"
      );
    });

    it("should throw when assertion throws an AssertionError with a different message", () => {
      expect(() =>
        testAssert().throwsAssertionError((a) => a.isEqualTo(2), "error")
      ).toThrow(
        'Expected error to have message "error", but it was "Expected 1 to equal 2"'
      );
    });

    it("should throw when assertion throws an error that is not an AssertionError", () => {
      expect(() =>
        testAssert().throwsAssertionError(() => {
          throw new Error();
        }, "error")
      ).toThrow(
        "Expected assertion to throw an AssertionError, but it was Error {}"
      );
    });
  });
});
