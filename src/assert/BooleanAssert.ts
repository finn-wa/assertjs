import { AbstractAssert } from "./AbstractAssert";

/**
 * Class for making assertions about boolean values.
 */
export class BooleanAssert extends AbstractAssert<boolean> {
  /**
   * Asserts that the value is true.
   */
  isTrue(): void {
    if (this.value !== true) {
      throw new Error(`Expected ${this.value} to be true`);
    }
  }

  /**
   * Asserts that the value is false.
   */
  isFalse(): void {
    if (this.value !== false) {
      throw new Error(`Expected ${this.value} to be false`);
    }
  }
}
