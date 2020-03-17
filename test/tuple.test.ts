import { Tuple } from '../src/Tuple';

describe('a Tuple', () => {
  it('is constructed with four values, which can be referenced with props "x, y, z, and w" respectively', () => {
    const point = new Tuple(4, -4, 3, 1);

    expect(point.x).toEqual(4);
    expect(point.y).toEqual(-4);
    expect(point.z).toEqual(3);
    expect(point.w).toEqual(1);
  });

  it('when a tuple is contructed with a w value of 1, it is a point', () => {
    const point = new Tuple(4, -4, 3, 1);

    expect(point.isAPoint()).toBeTruthy();
    expect(point.isAVector()).toBeFalsy();
  });

  it('when a tuple is contructed with a w value of 0, it is a vector', () => {
    const point = new Tuple(4, -4, 3, 0);

    expect(point.isAPoint()).toBeFalsy();
    expect(point.isAVector()).toBeTruthy();
  });
});
