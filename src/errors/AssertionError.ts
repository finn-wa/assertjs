export class AssertionError extends Error {
  constructor(readonly message: string, cause?: unknown) {
    super(message);
    this.name = "AssertionError";
    this.cause = cause;
  }
}
