import { AbstractAssert } from "./AbstractAssert";

export class ArrayAssert<
  T extends ArrayLike<unknown>
> extends AbstractAssert<T> {}
