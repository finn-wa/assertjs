import { Assert } from "./Assert";

export class UnknownAssert extends Assert<unknown> {
  isEqualTo(other: unknown): void {
    throw new Error("Method not implemented.");
  }
}
