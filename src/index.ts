import { AbstractAssert } from "./assert/AbstractAssert";
import { ArrayAssert } from "./assert/ArrayAssert";
import { NumberAssert } from "./assert/NumberAssert";
import { StringAssert } from "./assert/StringAssert";
import { TestAssert } from "./assert/TestAssert";
import { UnknownAssert } from "./assert/UnknownAssert";

export function assertThat<T extends string>(value: T): StringAssert;
export function assertThat<T extends number>(value: T): NumberAssert;
export function assertThat<T extends ArrayLike<unknown>>(
  value: T
): ArrayAssert<T>;
export function assertThat<T extends AbstractAssert>(value: T): TestAssert<T>;
export function assertThat<T extends unknown>(value: T): UnknownAssert;
export function assertThat(value: unknown): UnknownAssert {
  if (typeof value === "string") {
    return new StringAssert(value);
  }
  if (typeof value === "number") {
    return new NumberAssert(value);
  }
  if (typeof value === "boolean") {
  }
  // other typeofs: "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
  if (Array.isArray(value)) {
    return new ArrayAssert(value);
  }
  if (value instanceof AbstractAssert) {
    return new TestAssert(value);
  }
  return new UnknownAssert(value);
}
