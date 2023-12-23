export abstract class Assert<T = unknown> {
  constructor(readonly value: T) {}
  abstract isEqualTo(other: T): void;
}
