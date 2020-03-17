import { Tuple, point } from '../src/Tuple';

describe('a Tuple', () => {
  it('is constructed with four values, which can be referenced with props "x, y, z, and w" respectively', () => {
    const aPoint = new Tuple(4, -4, 3, 1);

    expect(aPoint.x).toEqual(4);
    expect(aPoint.y).toEqual(-4);
    expect(aPoint.z).toEqual(3);
    expect(aPoint.w).toEqual(1);
  });

  it('when a tuple is contructed with a w value of 1, it is a point', () => {
    const aPoint = new Tuple(4, -4, 3, 1);

    expect(aPoint.isAPoint()).toBeTruthy();
    expect(aPoint.isAVector()).toBeFalsy();
  });

  it('when a tuple is contructed with a w value of 0, it is a vector', () => {
    const vector = new Tuple(4, -4, 3, 0);

    expect(vector.isAPoint()).toBeFalsy();
    expect(vector.isAVector()).toBeTruthy();
  });
});

describe('the point function', () => {
  const aPoint = point(4, 1, 2);

  expect(aPoint.isAPoint()).toBeTruthy();
});
