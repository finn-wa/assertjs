import { AssertionError } from "../errors/AssertionError";
import { AbstractAssert } from "./AbstractAssert";

/**
 * Class for making assertions about boolean values.
 */
export class BooleanAssert extends AbstractAssert<boolean> {
  /**
   * Asserts that the value is true.
   */
  isTrue(): this {
    if (this.value === true) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be true", this.value)
    );
  }

  /**
   * Asserts that the value is false.
   */
  isFalse(): this {
    if (this.value === false) {
      return this;
    }
    throw new AssertionError(
      this.getDescription("Expected {} to be false", this.value)
    );
  }
}
