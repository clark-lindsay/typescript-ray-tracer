export function equal(a: number, b: number): boolean {
  const epsilon = Math.pow(2, -12);
  return Math.abs(a - b) < epsilon;
}
