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
}
