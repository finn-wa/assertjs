import { describe, it } from "bun:test";
import { NumberAssert } from "./NumberAssert";
import { assertThat } from "..";

describe("NumberAssert", () => {
  describe("isLessThan", () => {
    it("should not throw when less than", () => {
      assertThat(new NumberAssert(1)).successfullyAsserts((a) =>
        a.isLessThan(3)
      );
      assertThat(new NumberAssert(1.1)).successfullyAsserts((a) =>
        a.isLessThan(1.2)
      );
    });

    it("should throw when equal", () => {
      assertThat(new NumberAssert(1)).throwsAssertionError(
        (a) => a.isLessThan(1),
        "Expected 1 to be less than 1"
      );
    });

    it("should throw when greater than", () => {
      assertThat(new NumberAssert(1)).throwsAssertionError(
        (a) => a.isLessThan(0),
        "Expected 1 to be less than 0"
      );
      assertThat(new NumberAssert(1.0)).throwsAssertionError(
        (a) => a.isLessThan(0.9),
        "Expected 1 to be less than 0.9"
      );
    });
  });

  describe("isLessThanOrEqualTo", () => {
    it("should not throw when less than", () => {
      assertThat(new NumberAssert(1)).successfullyAsserts((a) =>
        a.isLessThanOrEqualTo(3)
      );
      assertThat(new NumberAssert(1.1)).successfullyAsserts((a) =>
        a.isLessThanOrEqualTo(1.2)
      );
    });

    it("should not throw when equal", () => {
      assertThat(new NumberAssert(1)).successfullyAsserts((a) =>
        a.isLessThanOrEqualTo(1)
      );
    });

    it("should throw when greater than", () => {
      assertThat(new NumberAssert(1)).throwsAssertionError(
        (a) => a.isLessThanOrEqualTo(0),
        "Expected 1 to be less than or equal to 0"
      );
      assertThat(new NumberAssert(1.0)).throwsAssertionError(
        (a) => a.isLessThanOrEqualTo(0.9),
        "Expected 1 to be less than or equal to 0.9"
      );
    });
  });

  describe("isGreaterThan", () => {
    it("should not throw when greater than", () => {
      assertThat(new NumberAssert(3)).successfullyAsserts((a) =>
        a.isGreaterThan(1)
      );
      assertThat(new NumberAssert(1.2)).successfullyAsserts((a) =>
        a.isGreaterThan(1.1)
      );
    });

    it("should throw when equal", () => {
      assertThat(new NumberAssert(1)).throwsAssertionError(
        (a) => a.isGreaterThan(1),
        "Expected 1 to be greater than 1"
      );
    });

    it("should throw when less than", () => {
      assertThat(new NumberAssert(0)).throwsAssertionError(
        (a) => a.isGreaterThan(1),
        "Expected 0 to be greater than 1"
      );
      assertThat(new NumberAssert(0.9)).throwsAssertionError(
        (a) => a.isGreaterThan(1.0),
        "Expected 0.9 to be greater than 1"
      );
    });
  });

  describe("isGreaterThanOrEqualTo", () => {
    it("should not throw when greater than", () => {
      assertThat(new NumberAssert(3)).successfullyAsserts((a) =>
        a.isGreaterThanOrEqualTo(1)
      );
      assertThat(new NumberAssert(1.2)).successfullyAsserts((a) =>
        a.isGreaterThanOrEqualTo(1.1)
      );
    });

    it("should not throw when equal", () => {
      assertThat(new NumberAssert(1)).successfullyAsserts((a) =>
        a.isGreaterThanOrEqualTo(1)
      );
    });

    it("should throw when less than", () => {
      assertThat(new NumberAssert(0)).throwsAssertionError(
        (a) => a.isGreaterThanOrEqualTo(1),
        "Expected 0 to be greater than or equal to 1"
      );
      assertThat(new NumberAssert(0.9)).throwsAssertionError(
        (a) => a.isGreaterThanOrEqualTo(1.0),
        "Expected 0.9 to be greater than or equal to 1"
      );
    });
  });
});
