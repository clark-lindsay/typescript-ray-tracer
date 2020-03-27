import { range } from './util';
import { equal } from './equal';
import { Tuple } from './Tuple';

export function identityMatrix(size: number): Matrix {
  const grid: number[][] = [];
  for (const rowIndex of range(0, size)) {
    grid.push(Array(size).fill(0));
    grid[rowIndex][rowIndex] = 1;
  }
  return new Matrix(grid);
}

export class Matrix {
  private height: number;
  private width: number;
  private grid: number[][];

  constructor(rows: number[][]) {
    rows.forEach(row => {
      if (row.length !== rows.length) throw new Error('A matrix can only be defined with square NxN dimensions');
    });

    [this.height, this.width] = [rows.length, rows.length];
    this.grid = rows;
  }

  at(row: number, column: number): number {
    return this.grid[row][column];
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  isEqualTo(other: Matrix): boolean {
    if (this.getHeight() !== other.getHeight() || this.getWidth() !== other.getWidth()) {
      return false;
    }
    for (const rowIndex of range(0, this.getHeight())) {
      for (const colIndex of range(0, this.getWidth())) {
        if (!equal(this.at(rowIndex, colIndex), other.at(rowIndex, colIndex))) {
          return false;
        }
      }
    }
    return true;
  }

  cross(other: Matrix): Matrix {
    const result: number[][] = [];
    for (const row of range(0, this.getHeight())) {
      result.push([]);
      for (const column of range(0, other.getWidth())) {
        let dotProduct = 0;
        for (const i of range(0, this.getWidth())) {
          dotProduct += this.at(row, i) * other.at(i, column);
        }
        result[result.length - 1].push(dotProduct);
      }
    }
    return new Matrix(result);
  }

  multipliedBy(tuple: Tuple): Tuple {
    const result: number[] = [];
    for (const row of range(0, this.getHeight())) {
      result.push(tuple.dotProduct(new Tuple(this.at(row, 0), this.at(row, 1), this.at(row, 2), this.at(row, 3))));
    }
    return new Tuple(result[0], result[1], result[2], result[3]);
  }

  transpose(): Matrix {
    const result: number[][] = [];
    range(0, this.getHeight()).forEach(_ => result.push([]));

    for (const rowIndex of range(0, this.getHeight())) {
      for (const colIndex of range(0, this.getWidth())) {
        result[colIndex][rowIndex] = this.at(rowIndex, colIndex);
      }
    }
    return new Matrix(result);
  }

  determinant(): number {
    return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0);
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
}
