import { hit } from '../src/hit';
import { Sphere } from '../src/Sphere';
import { Intersection } from '../src/Intersection';
import { IntersectionCollection } from '../src/IntersectionCollection';

describe('the hit function', () => {
  it('returns the first intersection when all intersections have a positive t value', () => {
    const sphere = new Sphere({});
    const [i1, i2] = [new Intersection(1, sphere), new Intersection(2, sphere)];

    expect(hit(new IntersectionCollection([i1, i2]))).toBe(i1);
  });

  it('returns the first non-negative t when the list of intersections has negatives', () => {
    const sphere = new Sphere({});
    const [i1, i2] = [new Intersection(-1, sphere), new Intersection(2, sphere)];

    expect(hit(new IntersectionCollection([i1, i2]))).toBe(i2);
  });

  it('returns null when all intersections have a negative t', () => {
    const sphere = new Sphere({});
    const [i1, i2] = [new Intersection(-5, sphere), new Intersection(-2, sphere)];

    expect(hit(new IntersectionCollection([i1, i2]))).toBeNull();
  });

  it('returns null when given an empty list of intersections', () => {
    expect(hit(new IntersectionCollection())).toBeNull();
  });

  it('always returns the lowest non-negative integer if there are multiple', () => {
    const sphere = new Sphere({});
    const intersections = new IntersectionCollection([
      new Intersection(-1, sphere),
      new Intersection(5, sphere),
      new Intersection(7, sphere),
      new Intersection(2, sphere)
    ]);

    const contact = hit(intersections);
    if (contact) expect(contact.t).toEqual(2);
    else fail();
  });
});
