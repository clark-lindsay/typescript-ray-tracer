import { Tuple } from '../src/Tuple';

describe('a Tuple', () => {
  it('is constructed with four values, which can be referenced with props "x, y, z, and w" respectively', () => {
    const point = new Tuple(4, -4, 3, 1);

    expect(point.x).toEqual(4);
    expect(point.y).toEqual(-4);
    expect(point.z).toEqual(3);
    expect(point.w).toEqual(1);
    expect(point.isAPoint()).toBeTruthy();
    expect(point.isAVector()).toBeFalsy();
  });
});
