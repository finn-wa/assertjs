import { AssertionError } from "../errors/AssertionError";
import { format } from "../util/StringUtils";

/** Base class for all assertions. */
export abstract class AbstractAssert<T = unknown> {
  protected descriptionSupplier?: () => string;

  constructor(readonly value: T) {}

  /**
   * Asserts that the value is equal to the other value.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isEqualTo(other: T): this {
    if (this.value === other) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to equal {}", this.value, other)
    );
  }

  /**
   * Asserts that the value is not equal to the other value.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isNotEqualTo(other: T): this {
    if (this.value !== other) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} not to equal {}", this.value, other)
    );
  }

  /**
   * Asserts that the value is the same as the other value using the strict
   * equality operator.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isSameAs(other: T): this {
    if (this.value === other) {
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} to be the same as {} using strict equality",
        this.value,
        other
      )
    );
  }

  /**
   * Asserts that the value is not the same as the other value using the strict
   * equality operator.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isNotSameAs(other: T): this {
    if (this.value !== other) {
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} not to be the same as the other value using strict equality",
        this.value
      )
    );
  }

  /**
   * Sets the description of the assertion. This will be used in the error
   * message if an assertion error is thrown.
   *
   * @param description the description or lazy function returning a description
   * @returns this assert object for chaining
   */
  describedAs(description: string | (() => string)): this {
    if (typeof description === "function") {
      this.descriptionSupplier = description;
    } else if (typeof description === "string") {
      this.descriptionSupplier = () => description;
    } else {
      throw new Error("Invalid description: " + description);
    }
    return this;
  }

  /**
   * Prepends the assertion description to the provided detail message, if it
   * was set. Otherwise, the detail message is returned as is.
   *
   * @param detail the detail message
   * @param formatArgs the format arguments for the detail message
   * @returns the description
   */
  protected getDescription(detail: string, ...formatArgs: unknown[]) {
    const message = format(detail, ...formatArgs);
    return this.descriptionSupplier
      ? `${this.descriptionSupplier()}: ${message}`
      : message;
  }
}
