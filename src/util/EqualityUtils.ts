import { deepEquals as deepEqualsImpl } from "bun";

export function deepEquals(a: unknown, b: unknown): boolean {
  return deepEqualsImpl(a, b, true);
}
