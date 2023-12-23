export class ComparatorPredicates<T> {
  constructor(readonly value: T, readonly comparator: (a: T, b: T) => number) {}

  isLessThan(other: T): boolean {
    return this.comparator(this.value, other) < 0;
  }

  isLessThanOrEqualTo(other: T): boolean {
    return this.comparator(this.value, other) <= 0;
  }

  isGreaterThan(other: T): boolean {
    return this.comparator(this.value, other) > 0;
  }

  isGreaterThanOrEqualTo(other: T): boolean {
    return this.comparator(this.value, other) >= 0;
  }
}
