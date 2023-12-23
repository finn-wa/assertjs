export class AssertionError extends Error {
  constructor(
    readonly message: string,
    readonly expected: unknown,
    readonly actual: unknown,
    cause?: unknown
  ) {
    super(message);
    this.name = "AssertionError";
    this.cause = cause;
  }
}
