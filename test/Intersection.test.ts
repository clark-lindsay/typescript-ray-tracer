import { Intersection } from '../src/Intersection';
import { Ray } from '../src/Ray';
import { point, vector } from '../src/Tuple';
import { Sphere } from '../src/Sphere';
import { equal } from '../src/equal';

describe('the hitData function', () => {
  it('returns an object that contains all the relevant information about a hit, to be used in computations', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = new Sphere({});
    const intersection = new Intersection(4, shape);

    const data = intersection.hitData(ray);

    expect(equal(data.t, intersection.t)).toBeTruthy();
    expect(data.actor).toBe(shape);
    expect(data.point.isEqualTo(point(0, 0, -1))).toBeTruthy();
    expect(data.directionToEye.isEqualTo(vector(0, 0, -1))).toBeTruthy();
    expect(data.normalAtHit.isEqualTo(vector(0, 0, -1))).toBeTruthy();
  });
});
