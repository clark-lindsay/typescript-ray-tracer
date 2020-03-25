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
});
