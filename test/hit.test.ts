import { hit } from '../src/hit';
import { Sphere } from '../src/Sphere';
import { Intersection } from '../src/interfaces';

describe('the hit function', () => {
  it('returns the first intersection when all intersections have a positive t value', () => {
    const sphere = new Sphere();
    const [i1, i2] = [new Intersection(1, sphere), new Intersection(2, sphere)];

    expect(hit([i1, i2])).toBe(i1);
  });
});
