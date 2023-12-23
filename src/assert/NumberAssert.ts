import { Assert } from "./Assert";

export class NumberAssert extends Assert<number> {
  isEqualTo(other: number): void {
    throw new Error("Method not implemented.");
  }
}
