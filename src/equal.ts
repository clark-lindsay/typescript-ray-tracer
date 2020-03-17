export function equal(a: number, b: number): boolean {
  const twoToTheNegativeTen = 0.0009765625;
  return Math.abs(a - b) < twoToTheNegativeTen;
}
