export class Tuple {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  isAPoint(): boolean {
    return this.w === 1;
  }

  isAVector(): boolean {
    return this.w === 0;
  }
}
