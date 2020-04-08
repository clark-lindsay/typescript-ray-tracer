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

  // should take an ARRAY of ACTORS (Spheres at the moment) and iterate over that
  // maybe do a function overload where I can take either a single object or an array, to keep the syntax easy?
  intersects(sphere: Sphere): IntersectionCollection;
  intersects(actors: Sphere[]): IntersectionCollection;
  intersects(actors: any): IntersectionCollection {
    if (actors instanceof Sphere) {
      const singleActor = actors;
      const [discriminant, t1, t2] = disrciminantAndIntersectionTimes(
        singleActor,
        this.transform(singleActor.transform.inverse())
      );
      if (discriminant < 0) {
        return new IntersectionCollection();
      }
      return new IntersectionCollection([new Intersection(t1, singleActor), new Intersection(t2, singleActor)]);
    }

    const result = new IntersectionCollection();
    for (const sphere of actors) {
      const [discriminant, t1, t2] = disrciminantAndIntersectionTimes(
        sphere,
        this.transform(sphere.transform.inverse())
      );
      if (discriminant < 0) {
        return new IntersectionCollection();
      }
      result.add(new Intersection(t1, sphere));
      result.add(new Intersection(t2, sphere));
    }
    return result;

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
