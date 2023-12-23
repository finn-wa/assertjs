import { AssertionError } from "./AssertionError";

/** Base class for all assertions. */
export abstract class AbstractAssert<T = unknown> {
  protected overridingErrorMessage: string | null = null;

  constructor(readonly value: T) {}

  /**
   * Asserts that the value is equal to the other value.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isEqualTo(other: T): this {
    if (this.value !== other) {
      throw this.assertionError(
        `Expected ${this.value} to be equal to ${other}`,
        this.value,
        other
      );
    }
    return this;
  }

  /**
   * Asserts that the value is not equal to the other value.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isNotEqualTo(other: T): this {
    if (this.value === other) {
      throw this.assertionError(
        `Expected ${this.value} to not be equal to ${other}`,
        this.value,
        other
      );
    }
    return this;
  }

  /**
   * Asserts that the value is the same as the other value using the strict
   * equality operator.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isSameAs(other: T): this {
    if (this.value !== other) {
      throw this.assertionError(
        `Expected ${this.value} to be the same as ${other}`,
        this.value,
        other
      );
    }
    return this;
  }

  /**
   * Sets the description of the assertion. This will be used as the error
   * message if an assertion error is thrown.
   *
   * @param message the message
   * @returns this assert object for chaining
   */
  describedAs(message: string): this {
    this.overridingErrorMessage = message;
    return this;
  }

  /**
   * Returns an Assertion error with the given message, or the overriding
   * message if set with {@link describedAs}.
   *
   * @param defaultMessage the default message
   * @param expected the expected value
   * @param actual the actual value
   * @returns the assertion error
   */
  protected assertionError(
    defaultMessage: string,
    expected: unknown,
    actual: unknown
  ): AssertionError {
    return new AssertionError(
      this.overridingErrorMessage ?? defaultMessage,
      expected,
      actual
    );
  }
}
