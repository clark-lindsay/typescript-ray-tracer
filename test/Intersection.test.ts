import { Intersection } from '../src/Intersection';
import { Ray } from '../src/Ray';
import { point, vector } from '../src/Tuple';
import { Sphere } from '../src/Sphere';
import { equal } from '../src/equal';

describe('the hitData function', () => {
  it('returns an object that contains all the relevant information about a hit, to be used in computations', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = new Sphere();
    const intersection = new Intersection(4, shape);

    const data = intersection.hitData(ray);

    expect(equal(data.t, intersection.t)).toBeTruthy();
    expect(data.actor).toBe(shape);
    expect(data.point.isEqualTo(point(0, 0, -1))).toBeTruthy();
    expect(data.eyePosition.isEqualTo(point(0, 0, -5))).toBeTruthy();
    expect(data.normalAtHit.isEqualTo(vector(0, 0, -1))).toBeTruthy();
  });

  it('when a hit occurs on the outside of an Actor, the HitData returned has "isInsideActor" = false', () => {
    const ray = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = new Sphere();
    const intersection = new Intersection(4, shape);
    const data = intersection.hitData(ray);

    expect(data.isInsideActor).toEqual(false);
  });

  it('when a hit occurs on the inside of an Actor, the HitData returned has "isInsideActor" = true, and the normal is inverted (i.e. pointing inwards)', () => {
    const ray = new Ray(point(0, 0, 0), vector(0, 0, 1));
    const shape = new Sphere();
    const intersection = new Intersection(1, shape);
    const data = intersection.hitData(ray);

    expect(data.isInsideActor).toEqual(true);
    expect(data.normalAtHit.isEqualTo(vector(0, 0, -1))).toBeTruthy();
  });
});
