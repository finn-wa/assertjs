import { describe, expect, it } from "bun:test";
import { assertThat } from "..";
import { format, stringify } from "./StringUtils";

describe("StringUtils", () => {
  describe("stringify", () => {
    it("should convert an object to a JSON string", () => {
      assertThat(stringify("string")).isEqualTo('"string"');
      assertThat(stringify(1)).isEqualTo("1");
      assertThat(stringify(true)).isEqualTo("true");
      assertThat(stringify({ a: [1] })).isEqualTo('{"a": [1]}');
    });
  });

  describe("format", () => {
    it("should replace placeholders with stringified values", () => {
      assertThat(format("look: {} - an object", { a: [1] })).isEqualTo(
        'look: {"a": [1]} - an object'
      );
      assertThat(format("is it {} or is it {}", true, false)).isEqualTo(
        "is it true or is it false"
      );
    });

    it("should handle objects that look like placeholders", () => {
      assertThat(format("confusing behaviour? {} {}", {}, true)).isEqualTo(
        "confusing behaviour? {} true"
      );
    });

    it("should throw an error if there are less arguments than placeholders", () => {
      // TODO: replace expect with assertThat when it supports throwsError
      expect(() => format("{} {}", "arg1")).toThrow(
        'Too few arguments (1) for format string "{} {}"'
      );
    });

    it("should throw an error if there are more arguments than placeholders", () => {
      // TODO: replace expect with assertThat when it supports throwsError
      expect(() => format("{}", "arg1", "arg2")).toThrow(
        'Too many arguments (2) for format string "{}"'
      );
    });
  });
});
