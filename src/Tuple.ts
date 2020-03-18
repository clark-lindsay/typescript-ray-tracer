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

  scalarMultiply(scalar: number): Tuple {
    const dimensions = [this.x, this.y, this.z, this.w].map(num => num * scalar);
    return new Tuple(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
  }

  scalarDivide(scalar: number): Tuple {
    const scaledDimensions = [this.x, this.y, this.z, this.w].map(num => num / scalar);
    return new Tuple(scaledDimensions[0], scaledDimensions[1], scaledDimensions[2], scaledDimensions[3]);
  }

  magnitude(): number {
    const dimensions = [this.x, this.y, this.z, this.w];
    return Math.sqrt(dimensions.map(num => Math.pow(num, 2)).reduce((accumulator, num) => accumulator + num));
  }

  normalize(): Tuple {
    if (this.isAPoint()) {
      throw new Error('"normalize" can not be called on a point; it does not make mathematical sense');
    }
    return this.scalarDivide(this.magnitude());
  }

  negate(): Tuple {
    return this.scalarMultiply(-1);
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
