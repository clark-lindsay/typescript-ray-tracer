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
});
