import { Ray } from '../src/Ray';
import { point, vector } from '../src/Tuple';

describe('the Ray class', () => {
  it('can be contstructed with a point for an origin and a vector for a direction', () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const ray = new Ray(origin, direction);

    expect(ray.origin.isEqualTo(origin)).toBeTruthy();
    expect(ray.direction.isEqualTo(direction)).toBeTruthy();
  });

  it('can calculate the distance at any point "t" along the path of the ray', () => {
    const ray = new Ray(point(2, 3, 4), vector(1, 0, 0));

    expect(ray.position(0).isEqualTo(point(2, 3, 4))).toBeTruthy();
    expect(ray.position(1).isEqualTo(point(3, 3, 4))).toBeTruthy();
    expect(ray.position(-1).isEqualTo(point(1, 3, 4))).toBeTruthy();
    expect(ray.position(2.5).isEqualTo(point(4.5, 3, 4))).toBeTruthy();

    const moreComplexRay = new Ray(point(0, 0, 0), vector(4, -7, 2.5));

    expect(moreComplexRay.position(2).isEqualTo(point(8, -14, 5))).toBeTruthy();
    expect(moreComplexRay.position(3.5).isEqualTo(point(14, -24.5, 8.75))).toBeTruthy();
  });
});
