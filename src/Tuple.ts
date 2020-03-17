import { equal } from './equal';

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

  add(other: Tuple): Tuple {
    return new Tuple(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }

  subtract(other: Tuple): Tuple {
    return new Tuple(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
  }

  isAPoint(): boolean {
    return this.w === 1;
  }

  isAVector(): boolean {
    return this.w === 0;
  }

  isEqualTo(other: Tuple): boolean {
    return equal(this.x, other.x) && equal(this.y, other.y) && equal(this.z, other.z) && equal(this.w, other.w);
  }
}

export function point(x: number, y: number, z: number): Tuple {
  return new Tuple(x, y, z, 1);
}

export function vector(x: number, y: number, z: number): Tuple {
  return new Tuple(x, y, z, 0);
}
