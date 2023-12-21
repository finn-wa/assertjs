interface Assertion {
  isEqualTo(): void;
}

export function assertThat(): Assertion {
  return {
    isEqualTo() {},
  };
}
