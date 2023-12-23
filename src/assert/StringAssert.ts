import { Assert } from "./Assert";

export class StringAssert extends Assert<string> {
  isEqualTo(other: string): void {
    throw new Error("Method not implemented.");
  }
}
