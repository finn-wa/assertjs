import { Assert } from "./Assert";

/**
 * Class for making assertions about boolean values.
 */
export class BooleanAssert extends Assert<boolean> {
  /**
   * Asserts that the value is equal to the other value.
   * @param other the other value
   */
  isEqualTo(other: boolean): void {
    if (this.value !== other) {
      throw new Error(`Expected ${this.value} to be equal to ${other}`);
    }
  }

  /**
   * Asserts that the value is not equal to the other value.
   * @param other the other value
   */
  isNotEqualTo(other: boolean): void {
    if (this.value === other) {
      throw new Error(`Expected ${this.value} to not be equal to ${other}`);
    }
  }

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
