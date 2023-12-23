import { Assert } from "./Assert";

export class ArrayAssert<T extends ArrayLike<unknown>> extends Assert<T> {
  isEqualTo(other: T): void {
    throw new Error("Method not implemented.");
  }
}
