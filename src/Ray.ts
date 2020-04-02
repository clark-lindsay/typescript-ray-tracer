import { Tuple } from './Tuple';
import { Matrix } from './Matrix';
import { Sphere } from './Sphere';
import { Intersection } from './interfaces';
import { IntersectionCollection } from './IntersectionCollection';

export class Ray {
  origin: Tuple;
  direction: Tuple;

  constructor(origin: Tuple, direction: Tuple) {
    [this.origin, this.direction] = [origin, direction];
  }

  position(t: number): Tuple {
    return this.origin.add(this.direction.scalarMultiply(t));
  }

  intersects(sphere: Sphere): IntersectionCollection {
    const [discriminant, t1, t2] = disrciminantAndIntersectionTimes(sphere, this.transform(sphere.transform.inverse()));
    if (discriminant < 0) {
      return new IntersectionCollection([]);
    } else {
      return new IntersectionCollection([new Intersection(t1, sphere), new Intersection(t2, sphere)]);
    }

    function disrciminantAndIntersectionTimes(sphere: Sphere, ray: Ray): [number, number, number] {
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

  transform(transform: Matrix): Ray {
    return new Ray(this.origin.transform(transform), this.direction.transform(transform));
  }
}
