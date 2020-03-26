import { Matrix } from '../src/Matrix';
import { Tuple } from '../src/Tuple';
import { range } from '../src/util';

describe('the Matrix class', () => {
  it('can be instantiated as a 4x4 grid, with access to individual elements zero-indexed with row first', () => {
    const matrix = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);

    expect(matrix.getHeight()).toEqual(4);
    expect(matrix.getWidth()).toEqual(4);

    expect(matrix.at(0, 0)).toEqual(0);
    expect(matrix.at(1, 2)).toEqual(6);
    expect(matrix.at(2, 3)).toEqual(11);
    expect(matrix.at(3, 3)).toEqual(15);
  });

  it('can also be instantiated as a 2x2 or a 3x3', () => {
    const twoByTwo = new Matrix([range(0, 2), range(2, 4)]);
    const threeByThree = new Matrix([range(0, 3), range(3, 6), range(6, 9)]);

    expect(twoByTwo.getHeight()).toEqual(2);
    expect(twoByTwo.getWidth()).toEqual(2);
    expect(threeByThree.getHeight()).toEqual(3);
    expect(threeByThree.getWidth()).toEqual(3);

    expect(twoByTwo.at(0, 0)).toEqual(0);
    expect(twoByTwo.at(0, 1)).toEqual(1);
    expect(twoByTwo.at(1, 0)).toEqual(2);
    expect(twoByTwo.at(1, 1)).toEqual(3);

    expect(threeByThree.at(0, 0)).toEqual(0);
    expect(threeByThree.at(0, 2)).toEqual(2);
    expect(threeByThree.at(1, 1)).toEqual(4);
    expect(threeByThree.at(2, 2)).toEqual(8);
  });

  it('can determine equality between two matrices, even when floating-point numbers are close', () => {
    const matrix = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);
    const identical = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);
    const different = new Matrix([
      range(0, 4).map(num => addTinyIncrement(num)),
      range(4, 8),
      range(8, 12).map(num => addTinyIncrement(num)),
      range(12, 16)
    ]);
    const effectivelyIdentical = new Matrix([
      range(0, 4).map(num => addNegligibleIncrement(num)),
      range(4, 8),
      range(8, 12).map(num => addNegligibleIncrement(num)),
      range(12, 16)
    ]);

    expect(matrix.isEqualTo(identical)).toBeTruthy();
    expect(matrix.isEqualTo(different)).toBeFalsy();
    expect(matrix.isEqualTo(effectivelyIdentical)).toBeTruthy();

    function addTinyIncrement(num: number): number {
      return num + 0.001;
    }

    function addNegligibleIncrement(num: number): number {
      return num + 0.0001;
    }
  });

  it('can determine inequality if the matrices are of different dimensions, but containing the same numbers in their shared dimensions', () => {
    const matrix = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);
    const sameButTwoByTwo = new Matrix([range(0, 2), range(4, 6)]);
    const sameButThreeByThree = new Matrix([range(0, 3), range(4, 7), range(8, 11)]);

    expect(matrix.isEqualTo(sameButTwoByTwo)).toBeFalsy();
    expect(matrix.isEqualTo(sameButThreeByThree)).toBeFalsy();
  });

  it('can multiply one Matrix by another of the same dimensions to produce a new Matrix', () => {
    const matrix = new Matrix([range(1, 5), range(5, 9), range(6, 10).reverse(), range(2, 6).reverse()]);
    const other = new Matrix([
      [-2, 1, 2, 3],
      [3, 2, 1, -1],
      [4, 3, 6, 5],
      [1, 2, 7, 8]
    ]);
    const result = new Matrix([
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]
    ]);

    expect(matrix.cross(other).isEqualTo(result)).toBeTruthy();
  });

  it('can be multiplied by a Tuple to produce a Tuple', () => {
    const matrix = new Matrix([
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1]
    ]);
    const tuple = new Tuple(1, 2, 3, 1);

    expect(matrix.multipliedBy(tuple).isEqualTo(new Tuple(18, 24, 33, 1)));
  });
});
