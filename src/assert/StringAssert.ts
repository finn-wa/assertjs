import { AbstractAssert, AssertInfo } from "./AbstractAssert";
import { ComparatorPredicates } from "./predicates/ComparatorPredicates";

export class StringAssert extends AbstractAssert<string> {
  // readonly compare: ComparatorPredicates<string>;

  constructor(value: string, info: AssertInfo = {}) {
    super(value, info);
    // this.compare = new ComparatorPredicates(value, (a, b) =>
    // a.localeCompare(b)
    // );
  }

  protected withInfo(info: AssertInfo): this {
    return new StringAssert(this.value, info) as this;
  }
}
