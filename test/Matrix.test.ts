import { Matrix, identityMatrix } from '../src/Matrix';
import { Tuple } from '../src/Tuple';
import { range } from '../src/util';

describe('the Matrix class', () => {
  it('can be instantiated as a 4x4 grid, with access to individual elements zero-indexed with row first', () => {
    const matrix = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);

    expect(matrix.size()).toEqual(4);
    expect(matrix.size()).toEqual(4);

    expect(matrix.at(0, 0)).toEqual(0);
    expect(matrix.at(1, 2)).toEqual(6);
    expect(matrix.at(2, 3)).toEqual(11);
    expect(matrix.at(3, 3)).toEqual(15);
  });

  it('can also be instantiated as a 2x2 or a 3x3', () => {
    const twoByTwo = new Matrix([range(0, 2), range(2, 4)]);
    const threeByThree = new Matrix([range(0, 3), range(3, 6), range(6, 9)]);

    expect(twoByTwo.size()).toEqual(2);
    expect(twoByTwo.size()).toEqual(2);
    expect(threeByThree.size()).toEqual(3);
    expect(threeByThree.size()).toEqual(3);

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

    expect(matrix.multipliedBy(tuple).isEqualTo(new Tuple(18, 24, 33, 1))).toBeTruthy();
  });

  it('produces the same Matrix when multiplied by the Identity Matrix', () => {
    const twoByTwo = new Matrix([
      [1, 2],
      [2, 4]
    ]);
    const threeByThree = new Matrix([
      [1, 2, 3],
      [2, 4, 6],
      [3, 6, 9]
    ]);
    const fourByFour = new Matrix([
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1]
    ]);

    expect(twoByTwo.cross(identityMatrix(2)).isEqualTo(twoByTwo)).toBeTruthy();
    expect(threeByThree.cross(identityMatrix(3)).isEqualTo(threeByThree)).toBeTruthy();
    expect(fourByFour.cross(identityMatrix(4)).isEqualTo(fourByFour)).toBeTruthy();
  });

  it('can be transposed, returning a new Matrix whose rows and columns are flipped', () => {
    const matrix = new Matrix([
      [0, 1, 2, 3],
      [0, 2, 4, 6],
      [4, 2, 1, 0],
      [9, 8, 0, 3]
    ]);
    const result = new Matrix([
      [0, 0, 4, 9],
      [1, 2, 2, 8],
      [2, 4, 1, 0],
      [3, 6, 0, 3]
    ]);

    expect(matrix.transpose().isEqualTo(result)).toBeTruthy();
  });

  it('produces the identity matrix if the identity matrix is transposed', () => {
    expect(
      identityMatrix(4)
        .transpose()
        .isEqualTo(identityMatrix(4))
    ).toBeTruthy();
  });

  it('can calculate the determinant of any square Matrix with dimensions at least 2x2 ', () => {
    const twoByTwo = new Matrix([
      [1, 5],
      [-3, 2]
    ]);
    const threeByThree = new Matrix([
      [1, 2, 6],
      [-5, 8, -4],
      [2, 6, 4]
    ]);
    const fourByFour = new Matrix([
      [-2, -8, 3, 5],
      [-3, 1, 7, 3],
      [1, 2, -9, 6],
      [-6, 7, 7, -9]
    ]);

    expect(twoByTwo.determinant()).toEqual(17);
    expect(threeByThree.determinant()).toEqual(-196);
    expect(fourByFour.determinant()).toEqual(-4071);
  });

  it('can produce the submatrix of a Matrix, given a row and column to remove from the original', () => {
    const threeByThree = new Matrix([range(0, 3), range(3, 6), range(6, 9)]);
    const withoutFirstRowAndFirstColumn = new Matrix([range(4, 6), range(7, 9)]);
    const withoutSecondRowAndThirdColumn = new Matrix([range(0, 2), range(6, 8)]);

    expect(threeByThree.subMatrix(0, 0).isEqualTo(withoutFirstRowAndFirstColumn)).toBeTruthy();
    expect(threeByThree.subMatrix(1, 2).isEqualTo(withoutSecondRowAndThirdColumn)).toBeTruthy();

    const fourByFour = new Matrix([range(0, 4), range(4, 8), range(8, 12), range(12, 16)]);
    const withoutFirstRowAndSecondColumn = new Matrix([
      [4, 6, 7],
      [8, 10, 11],
      [12, 14, 15]
    ]);
    const withoutThirdRowAndFourthColumn = new Matrix([range(0, 3), range(4, 7), range(12, 15)]);

    expect(fourByFour.subMatrix(0, 1).isEqualTo(withoutFirstRowAndSecondColumn)).toBeTruthy();
    expect(fourByFour.subMatrix(2, 3).isEqualTo(withoutThirdRowAndFourthColumn)).toBeTruthy();
  });

  it('can calculate the minor of a a 3x3 Matrix, which is the determinant of the submatrix after removing the same row and column', () => {
    const threeByThree = new Matrix([
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ]);
    const subMatrix = threeByThree.subMatrix(1, 0);

    expect(subMatrix.determinant()).toEqual(25);
    expect(threeByThree.minor(1, 0)).toEqual(25);
  });

  it('can calculate a cofactor of an address in the Matrix, which is a minor that may or may not have a sign change', () => {
    const threeByThree = new Matrix([
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ]);

    expect(threeByThree.cofactor(0, 0)).toEqual(-12);
    expect(threeByThree.minor(0, 0)).toEqual(-12);
    expect(threeByThree.cofactor(1, 0)).toEqual(-25);
    expect(threeByThree.minor(1, 0)).toEqual(25);
  });
});
