import { Matrix } from '../src/Matrix';
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
});
