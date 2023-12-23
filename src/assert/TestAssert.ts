import { AssertionError } from "../errors/AssertionError";
import { AbstractAssert, AssertInfo } from "./AbstractAssert";

/** Assertions for testing classes that extend AbstractAssert */
export class TestAssert<T extends AbstractAssert> extends AbstractAssert<T> {
  /**
   * Asserts that the assertion succeeds and returns an assert object with the
   * same value.
   *
   * @param assertion a function that performs an assertion
   * @returns this assert object for chaining
   */
  successfullyAsserts(assertion: (assert: T) => T) {
    let result: T;
    try {
      result = assertion(this.value);
    } catch (error) {
      throw new AssertionError(
        this.getDescription(
          "Expected assertion to succeed, but it failed with error:\n{}",
          (error as Error)?.message ?? error
        ),
        error
      );
    }
    if (this.value.value === result.value) {
      return this;
    }
    throw new AssertionError(
      "Expected the returned assert object to contain the same value as the original"
    );
  }

  /**
   * Asserts that the assertion throws an AssertionError with the provided message.
   *
   * @param assertion a function that performs an assertion
   * @param message the expected message
   * @returns this assert object for chaining
   */
  throwsAssertionError(assertion: (assert: T) => T, message: string) {
    try {
      assertion(this.value);
    } catch (error) {
      if (!(error instanceof AssertionError)) {
        throw new AssertionError(
          this.getDescription(
            `Expected assertion to throw an AssertionError, but it was ${error?.constructor.name} {}`,
            error
          )
        );
      }
      if (error.message !== message) {
        throw new AssertionError(
          this.getDescription(
            "Expected error to have message {}, but it was {}",
            message,
            error.message
          )
        );
      }
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected assertion to throw an AssertionError, but it succeeded"
      )
    );
  }

  protected withInfo(info: AssertInfo): this {
    return new TestAssert(this.value, info) as this;
  }
}
