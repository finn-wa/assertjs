import { AbstractAssert } from "./AbstractAssert";
import { ComparatorPredicates } from "./predicates/ComparatorPredicates";

export class StringAssert extends AbstractAssert<string> {
  // readonly compare: ComparatorPredicates<string>;

  constructor(value: string) {
    super(value);
    // this.compare = new ComparatorPredicates(value, (a, b) =>
    // a.localeCompare(b)
    // );
  }
}
