export function setCharAt(str: string, index: number, char: string) {
  if (index > str.length - 1) throw new Error('The index specified must be in the range [0, str.length)');
  return str.substring(0, index) + char + str.substring(index + 1);
}

export function range(start: number, end: number): number[] {
  if (end < start || start < 0 || end < 0) {
    throw Error('The start and end values of a range must be positive, with end >= start');
  }
  return Array.from(new Array(end - start), (_, i) => i + start);
}
