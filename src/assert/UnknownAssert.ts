import { AbstractAssert, AssertInfo } from "./AbstractAssert";

export class UnknownAssert<T = unknown> extends AbstractAssert<T> {
  protected withInfo(info: AssertInfo): this {
    return new UnknownAssert(this.value, info) as this;
  }
}
