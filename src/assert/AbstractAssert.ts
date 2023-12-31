import { deepEquals } from "../util/EqualityUtils";
import { AssertionError } from "../errors/AssertionError";
import { format } from "../util/StringUtils";
import { ClassType } from "../util/Types";

export interface AssertInfo {
  readonly description?: () => string;
}

/** Base class for all assertions. */
export abstract class AbstractAssert<T = unknown> {
  constructor(readonly value: T, readonly info: AssertInfo = {}) {}

  /**
   * Returns a copy of this assert object with the provided info. Assert objects
   * are immutable, so properties cannot be changed directly.
   *
   * @param info the new info property value
   * @returns a copy of this assert object with the provided info
   */
  protected abstract withInfo(info: AssertInfo): this;

  /**
   * Asserts that the value is equal to the other value using deep equality
   * checking.
   *
   * @param other the other value
   * @returns this assert object for chaining
   */
  isEqualTo(other: T): this {
    if (deepEquals(this.value, other)) {
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
    if (!deepEquals(this.value, other)) {
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
        "Expected {} not to be the same as the provided value using strict equality",
        this.value
      )
    );
  }

  /**
   * Asserts that the value is an instance of the provided class.
   *
   * @param instanceClass the class
   * @returns this assert object for chaining, with the value narrowed to the
   * 	provided class
   */
  isInstanceOf<U>(instanceClass: ClassType<U>): AbstractAssert<U> {
    if (this.value instanceof instanceClass) {
      return this as unknown as AbstractAssert<U>;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} to be an instance of " + instanceClass.name,
        this.value
      )
    );
  }

  /**
   * Asserts that the value is not an instance of the provided class.
   *
   * @param instanceClass the class
   * @returns this assert object for chaining, with the value narrowed to
   * 	exclude the provided class
   */
  isNotInstanceOf<U>(
    instanceClass: ClassType<U>
  ): AbstractAssert<Exclude<T, U>> {
    if (!(this.value instanceof instanceClass)) {
      return this as AbstractAssert<Exclude<T, U>>;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} not to be an instance of " + instanceClass.name,
        this.value
      )
    );
  }

  /**
   * Asserts that the value is null.
   *
   * @returns this assert object for chaining, with the value narrowed to null
   */
  isNull(): AbstractAssert<null> {
    if (this.value === null) {
      return this as AbstractAssert<null>;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be null", this.value)
    );
  }

  /**
   * Asserts that the value is not null.
   *
   * @returns this assert object for chaining, with the value narrowed to
   * 	exclude null
   */
  isNotNull(): AbstractAssert<Exclude<T, null>> {
    if (this.value !== null) {
      return this as AbstractAssert<Exclude<T, null>>;
    }
    throw new AssertionError(
      this.getDescription("Expected value not to be null")
    );
  }

  /**
   * Asserts that the value is not undefined.
   *
   * @returns this assert object for chaining, with the value narrowed to
   * 	exclude undefined
   */
  isDefined(): AbstractAssert<Exclude<T, undefined>> {
    if (this.value !== undefined) {
      return this as AbstractAssert<Exclude<T, undefined>>;
    }
    throw new AssertionError(
      this.getDescription("Expected value not to be undefined")
    );
  }

  /**
   * Asserts that the value is undefined.
   *
   * @returns this assert object for chaining, with the value narrowed to
   * 	undefined
   */
  isUndefined(): AbstractAssert<undefined> {
    if (this.value === undefined) {
      return this as AbstractAssert<undefined>;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be undefined", this.value)
    );
  }

  /**
   * Asserts that the value is truthy.
   *
   * @returns this assert object for chaining
   */
  isTruthy(): this {
    if (this.value) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be truthy", this.value)
    );
  }

  /**
   * Asserts that the value is falsy.
   *
   * @returns this assert object for chaining
   */
  isFalsy(): this {
    if (!this.value) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be falsy", this.value)
    );
  }

  /**
   * Asserts that the value satisfies the provided predicate function.
   *
   * @param predicate a predicate function that returns a boolean.
   * 	If the predicate returns false, an assertion error is thrown.
   * @returns this assert object for chaining
   */
  satisfies(predicate: (value: T) => boolean): this;
  /**
   * Asserts that the value passes the assertions in the consuming function.
   *
   * @param assertions a function that accepts the value, containing assertions
   * @returns this assert object for chaining
   */
  satisfies(assertions: (value: T) => void | AbstractAssert): this;
  satisfies(
    assertionsOrPredicate: (value: T) => boolean | void | AbstractAssert
  ): this {
    const result = assertionsOrPredicate(this.value);
    if (result === false) {
      throw new AssertionError(
        this.getDescription("Expected {} to satisfy the predicate", this.value)
      );
    }
    return this;
  }

  /**
   * Sets the description of the assertion. This will be used in the error
   * message if an assertion error is thrown.
   *
   * @param description the description or lazy function returning a description
   * @returns an assert object for chaining
   */
  describedAs(description: string | (() => string)): this {
    let descriptionFn =
      typeof description === "function" ? description : () => description;
    return this.withInfo({ ...this.info, description: descriptionFn });
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
    return this.info.description
      ? `${this.info.description()}: ${message}`
      : message;
  }
}
