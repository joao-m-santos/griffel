/**
 * Compares two strings to see if they match.
 *
 * @param { string } str1 First string to compare.
 * @param { string } str2 Second string to compare.
 * @returns { boolean } True if strings match, false otherwise.
 */
export function compareStrings(str1, str2) {
  return str1?.trim().toLowerCase().includes(str2?.trim().toLowerCase());
}

// For display mapping
export const STATUS = {
  planned: "Planned",
  done: "Done"
};
