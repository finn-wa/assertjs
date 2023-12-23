import stringifyImpl from "json-stringify-pretty-compact";

/**
 * Stringifies the given value into a JSON.
 *
 * @param value the value to stringify
 * @returns the string representation
 */
export function stringify(value: unknown): string {
  return stringifyImpl(value);
}

/**
 * Formats the given string with the given stringified values, substituting
 * placeholders "{}".
 *
 * @param str the string to format
 * @param values the values to stringify and insert
 * @returns the formatted string
 */
export function format(str: string, ...values: unknown[]) {
  // Using a different placeholder because an empty object value stringified is {}
  const placeholder = "%P%";
  let output = str.replaceAll(/{}/g, placeholder);
  for (const arg in values) {
    if (!output.includes(placeholder)) {
      throw new Error(
        `Too many arguments (${values.length}) for format string "${str}"`
      );
    }
    output = output.replace(placeholder, stringifyImpl(values[arg]));
  }
  if (output.includes(placeholder)) {
    throw new Error(
      `Too few arguments (${values.length}) for format string "${str}"`
    );
  }
  return output;
}
