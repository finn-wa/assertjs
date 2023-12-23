import { describe, expect, it } from "bun:test";
import { assertThat } from ".";
import { ArrayAssert } from "./assert/ArrayAssert";
import { NumberAssert } from "./assert/NumberAssert";
import { StringAssert } from "./assert/StringAssert";
import { TestAssert } from "./assert/TestAssert";
import { UnknownAssert } from "./assert/UnknownAssert";

describe("assertThat", () => {
  it("should return a StringAssert when called with a string", () => {
    expect(assertThat("foo")).toBeInstanceOf(StringAssert);
  });

  it("should return a NumberAssert when called with a number", () => {
    expect(assertThat(42)).toBeInstanceOf(NumberAssert);
  });

  it("should return an ArrayAssert when called with an array", () => {
    expect(assertThat([])).toBeInstanceOf(ArrayAssert);
  });

  it("should return a TestAssert when called with an AbstractAssert subclass", () => {
    expect(assertThat(new UnknownAssert(null))).toBeInstanceOf(TestAssert);
  });

  it("should return an UnknownAssert when called with an unknown type", () => {
    expect(assertThat(null)).toBeInstanceOf(UnknownAssert);
  });
});
