import { Tuple, point, vector } from '../src/Tuple';

describe('a Tuple', () => {
  it('is constructed with four values, which can be referenced with props "x, y, z, and w" respectively', () => {
    const aPoint = new Tuple(4, -4, 3, 1);

    expect(aPoint.x).toEqual(4);
    expect(aPoint.y).toEqual(-4);
    expect(aPoint.z).toEqual(3);
    expect(aPoint.w).toEqual(1);
  });

  it('when a tuple is constructed with a w value of 1, it is a point', () => {
    const aPoint = new Tuple(4, -4, 3, 1);

    expect(aPoint.isAPoint()).toBeTruthy();
    expect(aPoint.isAVector()).toBeFalsy();
  });

  it('when a tuple is constructed with a w value of 0, it is a vector', () => {
    const vector = new Tuple(4, -4, 3, 0);

    expect(vector.isAPoint()).toBeFalsy();
    expect(vector.isAVector()).toBeTruthy();
  });

  it('can compare two tuples for equality', () => {
    const someTuple = new Tuple(4, -4, 3, 0);
    const theSameTuple = new Tuple(4, -4, 3, 0);
    const differentTuple = new Tuple(3, -4, 2, 0);

    expect(someTuple.isEqualTo(someTuple)).toBeTruthy();
    expect(someTuple.isEqualTo(theSameTuple)).toBeTruthy();
    expect(someTuple.isEqualTo(differentTuple)).toBeFalsy();
  });

  it('can add two tuples together to produce a new tuple', () => {
    const aPoint = point(4, -4, 3);
    const aVector = vector(4, -4, 3);

    expect(aPoint.add(aVector).isEqualTo(new Tuple(8, -8, 6, 1))).toBeTruthy();
    expect(aVector.add(aVector).isEqualTo(new Tuple(8, -8, 6, 0))).toBeTruthy();
  });

  it('can subtract one tuple from another to produce a new tuple', () => {
    const aPoint = point(4, 1, 3);
    const aVector = vector(4, 7, 2);

    expect(aPoint.subtract(aVector).isEqualTo(new Tuple(0, -6, 1, 1))).toBeTruthy();
    expect(aVector.subtract(aVector).isEqualTo(new Tuple(0, 0, 0, 0))).toBeTruthy();
  });
});

describe('the point function', () => {
  const aPoint = point(4, 1, 2);

  expect(aPoint.isAPoint()).toBeTruthy();
  expect(aPoint.isAVector()).toBeFalsy();
});

describe('the vector function', () => {
  const aVector = vector(4, 1, 2);

  expect(aVector.isAVector()).toBeTruthy();
  expect(aVector.isAPoint()).toBeFalsy();
});