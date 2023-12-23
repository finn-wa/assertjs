import { expect } from "bun:test";
import { AssertionError } from "../errors/AssertionError";
import { AbstractAssert } from "./AbstractAssert";

export class TestAssert<T extends AbstractAssert> extends AbstractAssert<T> {
  successfullyAsserts(assertion: (assert: T) => T) {
    let result: T;
    try {
      result = assertion(this.value);
    } catch (error) {
      throw new AssertionError(
        this.getDescription(
          "Expected assertion to succeed, but it failed with error {}",
          error
        ),
        error
      );
    }
    this.isSameAs(result);
  }

  throwsAssertionError(assertion: (assert: T) => T, message: string) {
    try {
      assertion(this.value);
    } catch (error) {
      expect(error).toBeInstanceOf(AssertionError);
      expect((error as AssertionError).message).toBe(message);
      return;
    }
    throw new AssertionError(
      this.getDescription("Expected assertion to throw an error")
    );
  }
}
