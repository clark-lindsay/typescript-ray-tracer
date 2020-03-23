import { Tuple } from './Tuple';

export class Color {
  rgb: Tuple = new Tuple(0, 0, 0, 0);
  red = () => this.rgb.x;
  green = () => this.rgb.y;
  blue = () => this.rgb.z;

  constructor(red: number, green: number, blue: number) {
    [this.rgb.x, this.rgb.y, this.rgb.z] = [red, green, blue];
    return this;
  }

  isEqualTo(other: Color): boolean {
    return this.red() === other.red() && this.green() === other.green() && this.blue() === other.blue();
  }

  add(other: Color): Color {
    const newColorAsTuple = this.rgb.add(other.rgb);
    return new Color(newColorAsTuple.x, newColorAsTuple.y, newColorAsTuple.z);
  }

  subtract(other: Color): Color {
    const newColorAsTuple = this.rgb.subtract(other.rgb);
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
