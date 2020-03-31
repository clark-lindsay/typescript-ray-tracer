import { range } from './util';
import { equal } from './equal';
import { Tuple } from './Tuple';
import { xRotationTransformation, yRotationTransformation, zRotationTransformation } from './transformations';

export class Matrix {
  private grid: number[][];

  constructor(rows: number[][]) {
    rows.forEach(row => {
      if (row.length !== rows.length) throw new Error('A matrix can only be defined with square NxN dimensions');
    });

    this.grid = rows;
  }

  at(row: number, column: number): number {
    return this.grid[row][column];
  }

  size(): number {
    return this.grid.length;
  }

  isEqualTo(other: Matrix): boolean {
    if (this.size() !== other.size() || this.size() !== other.size()) {
      return false;
    }
    for (const rowIndex of range(0, this.size())) {
      for (const colIndex of range(0, this.size())) {
        if (!equal(this.at(rowIndex, colIndex), other.at(rowIndex, colIndex))) {
          return false;
        }
      }
    }
    return true;
  }

  cross(other: Matrix): Matrix {
    const result: number[][] = [];
    for (const row of range(0, this.size())) {
      result.push([]);
      for (const column of range(0, other.size())) {
        let dotProduct = 0;
        for (const i of range(0, this.size())) {
          dotProduct += this.at(row, i) * other.at(i, column);
        }
        result[result.length - 1].push(dotProduct);
      }
    }
    return new Matrix(result);
  }

  multipliedBy(tuple: Tuple): Tuple {
    const result: number[] = [];
    for (const row of range(0, this.size())) {
      result.push(tuple.dotProduct(new Tuple(this.at(row, 0), this.at(row, 1), this.at(row, 2), this.at(row, 3))));
    }
    return new Tuple(result[0], result[1], result[2], result[3]);
  }

  transpose(): Matrix {
    const result: number[][] = [];
    range(0, this.size()).forEach(_ => result.push([]));

    for (const rowIndex of range(0, this.size())) {
      for (const colIndex of range(0, this.size())) {
        result[colIndex][rowIndex] = this.at(rowIndex, colIndex);
      }
    }
    return new Matrix(result);
  }

  determinant(): number {
    if (this.size() === 2) {
      return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0);
    } else {
      const rowIndex = 0;
      return this.grid[rowIndex].reduce(
        (accumulator, element, columnIndex) => accumulator + element * this.cofactor(rowIndex, columnIndex),
        0
      );
    }
  }

  subMatrix(rowToRemove: number, columnToRemove: number): Matrix {
    const result: number[][] = [];
    for (const row of this.grid.filter((_, rowIndex) => shouldRemain({ rowIndex }))) {
      result.push(row.filter((_, columnIndex) => shouldRemain({ columnIndex })));
    }
    return new Matrix(result);

    function shouldRemain({ rowIndex, columnIndex }: RowAndColumnIndices): boolean {
      if (rowIndex !== rowToRemove && columnIndex !== columnToRemove) {
        return true;
      }
      return false;
    }
    interface RowAndColumnIndices {
      rowIndex?: number;
      columnIndex?: number;
    }
  }

  minor(row: number, column: number): number {
    return this.subMatrix(row, column).determinant();
  }

  cofactor(row: number, column: number): number {
    if (isEven(row + column)) return this.minor(row, column);
    return -this.minor(row, column);

    function isEven(num: number): boolean {
      return num % 2 === 0;
    }
  }

  inverse(): Matrix {
    const determinant = this.determinant();
    if (equal(determinant, 0)) {
      throw new Error('A matrix with a determinant of 0 is not invertible.');
    }
    const inverseGrid: number[][] = [];
    for (const _ of range(0, this.size())) {
      inverseGrid.push(Array(this.size()));
    }
    for (const [rowIndex, row] of this.grid.entries()) {
      row.forEach((_, columnIndex) => {
        return (inverseGrid[columnIndex][rowIndex] = this.cofactor(rowIndex, columnIndex) / determinant);
      });
    }
    return new Matrix(inverseGrid);
  }

  rotate(axis: Axes, degreesInRadians: number): Matrix {
    if (axis === Axes.X) {
      return xRotationTransformation(degreesInRadians).cross(this);
    } else if (axis === Axes.Y) {
      return yRotationTransformation(degreesInRadians).cross(this);
    } else if (axis === Axes.Z) {
      return zRotationTransformation(degreesInRadians).cross(this);
    } else throw new Error('Unrecognized rotation matrix');
  }
}

export function identityMatrix(size: number): Matrix {
  return new Matrix(identityGrid(size));
}

export function identityGrid(size: number): number[][] {
  const oneByOneIdentity = [[1]];
  const twoByTwoIdentity = [
    [1, 0],
    [0, 1]
  ];
  const threeByThreeIdentity = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  const fourByFourIdentity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  const identities: IdentityMap = {
    1: oneByOneIdentity,
    2: twoByTwoIdentity,
    3: threeByThreeIdentity,
    4: fourByFourIdentity
  };
  if (!identities[size]) {
    throw new Error('There is no identity Matrix defined for this size');
  }
  return identities[size];
  interface IdentityMap {
    [key: number]: number[][];
  }
}

export enum Axes {
  X,
  Y,
  Z
}
