import { Assert } from "./Assert";

export class BooleanAssert extends Assert<boolean> {
  isEqualTo(other: boolean): void {
    if (this.value !== other) {
      throw new Error(`Expected ${this.value} to be equal to ${other}`);
    }
  }

  isTrue(): void {
    if (this.value !== true) {
      throw new Error(`Expected ${this.value} to be true`);
    }
  }

  isFalse(): void {
    if (this.value !== false) {
      throw new Error(`Expected ${this.value} to be false`);
    }
  }
}
