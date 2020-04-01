import { Tuple } from './Tuple';
import { Sphere } from './Sphere';

export class Ray {
  origin: Tuple;
  direction: Tuple;

  constructor(origin: Tuple, direction: Tuple) {
    [this.origin, this.direction] = [origin, direction];
  }

  position(t: number): Tuple {
    return this.origin.add(this.direction.scalarMultiply(t));
  }

  intersects(sphere: Sphere): number[] {
    const sphereToRay = this.origin.subtract(sphere.center);
    const a = this.direction.dotProduct(this.direction);
    const b = 2 * this.direction.dotProduct(sphereToRay);
    const c = sphereToRay.dotProduct(sphereToRay) - 1;
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
      return [];
    } else {
      return [(-b - Math.sqrt(discriminant)) / (2 * a), (-b + Math.sqrt(discriminant)) / (2 * a)].sort((a, b) => a - b);
    }
  }
}
