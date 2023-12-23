/**
 * Stringifies the given value into a JSON.
 *
 * @param value the value to stringify
 * @returns the string representation
 */
export function stringify(value: unknown): string {
  return JSON.stringify(value, null, 2);
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
  let output = str.replaceAll(/{}/g, "%s");
  for (const arg in values) {
    if (!output.includes("%s")) {
      throw new Error(
        `Too many arguments (${values.length}) for format string "${str}"`
      );
    }
    output = output.replace("%s", stringify(values[arg]));
  }
  if (output.includes("%s")) {
    throw new Error(
      `Too few arguments (${values.length}) for format string "${str}"`
    );
  }
  return output;
}
