import { vector } from './Tuple';

export class Color {
  private r: number;
  private g: number;
  private b: number;

  constructor(red: number, green: number, blue: number) {
    [this.r, this.g, this.b] = [red, green, blue];
    return this;
  }

  red(): number {
    return this.r;
  }
  green(): number {
    return this.g;
  }
  blue(): number {
    return this.b;
  }

  isEqualTo(other: Color): boolean {
    return this.red() === other.red() && this.green() === other.green() && this.blue() === other.blue();
  }

  add(other: Color): Color {
    const thisAsTuple = vector(this.red(), this.green(), this.blue());
    const otherColorAsTuple = vector(other.red(), other.green(), other.blue());
    const newColorAsTuple = thisAsTuple.add(otherColorAsTuple);
    return new Color(newColorAsTuple.x, newColorAsTuple.y, newColorAsTuple.z);
  }

  subtract(other: Color): Color {
    const thisAsTuple = vector(this.red(), this.green(), this.blue());
    const otherColorAsTuple = vector(other.red(), other.green(), other.blue());
    const newColorAsTuple = thisAsTuple.subtract(otherColorAsTuple);
    return new Color(newColorAsTuple.x, newColorAsTuple.y, newColorAsTuple.z);
  }

  multiply(other: Color): Color {
    return new Color(this.red() * other.red(), this.green() * other.green(), this.blue() * other.blue());
  }

  convertToScale(scaleMin: number = 0, scaleMax: number = 255): Color {
    let [resultRed, resultGreen, resultBlue] = [this.red(), this.green(), this.blue()]
      .map(colorIntensity => Math.max(scaleMin, colorIntensity))
      .map(colorIntensity => colorIntensity * scaleMax)
      .map(colorIntensity => Math.ceil(colorIntensity))
      .map(colorIntensity => Math.min(scaleMax, colorIntensity));

    return new Color(resultRed, resultGreen, resultBlue);
  }
}
