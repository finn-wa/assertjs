import { AbstractAssert, AssertInfo } from "./AbstractAssert";

export class ArrayAssert<
  T extends ArrayLike<unknown>
> extends AbstractAssert<T> {
  protected withInfo(info: AssertInfo): this {
    return new ArrayAssert(this.value, info) as this;
  }
}
