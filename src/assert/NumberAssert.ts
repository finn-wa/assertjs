import { AssertionError } from "../errors/AssertionError";
import { AbstractAssert, AssertInfo } from "./AbstractAssert";
import { ComparatorPredicates } from "./predicates/ComparatorPredicates";

export class NumberAssert extends AbstractAssert<number> {
  readonly compare: ComparatorPredicates<number>;

  constructor(value: number, info: AssertInfo = {}) {
    super(value, info);
    this.compare = new ComparatorPredicates(value, (a, b) => a - b);
  }

  /**
   * Asserts that the value is less than the provided value.
   *
   * @param other the provided value
   * @returns this assert object for chaining
   */
  isLessThan(other: number): this {
    if (this.compare.isLessThan(other)) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be less than {}", this.value, other)
    );
  }

  /**
   * Asserts that the value is less than or equal to the provided value.
   *
   * @param other the provided value
   * @returns this assert object for chaining
   */
  isLessThanOrEqualTo(other: number): this {
    if (this.compare.isLessThanOrEqualTo(other)) {
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} to be less than or equal to {}",
        this.value,
        other
      )
    );
  }

  /**
   * Asserts that the value is greater than the provided value.
   *
   * @param other the provided value
   * @returns this assert object for chaining
   */
  isGreaterThan(other: number): this {
    if (this.compare.isGreaterThan(other)) {
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} to be greater than {}",
        this.value,
        other
      )
    );
  }

  /**
   * Asserts that the value is greater than or equal to the provided value.
   *
   * @param other the provided value
   * @returns this assert object for chaining
   */
  isGreaterThanOrEqualTo(other: number): this {
    if (this.compare.isGreaterThanOrEqualTo(other)) {
      return this;
    }
    throw new AssertionError(
      this.getDescription(
        "Expected {} to be greater than or equal to {}",
        this.value,
        other
      )
    );
  }

  protected withInfo(info: AssertInfo): this {
    return new NumberAssert(this.value, info) as this;
  }
}
