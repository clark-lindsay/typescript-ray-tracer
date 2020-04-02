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
    const [discriminant, t1, t2] = disrciminant(sphere, this);
    if (discriminant < 0) {
      return [];
    } else {
      return [t1, t2];
    }

    function disrciminant(sphere: Sphere, ray: Ray): [number, number, number] {
      const sphereToRay = ray.origin.subtract(sphere.center);
      const a = ray.direction.dotProduct(ray.direction);
      const b = 2 * ray.direction.dotProduct(sphereToRay);
      const c = sphereToRay.dotProduct(sphereToRay) - 1;

      const discriminant = Math.pow(b, 2) - 4 * a * c;
      const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
      return [discriminant, t1, t2];
    }
  }
}
