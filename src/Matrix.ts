import { range } from './util';
import { equal } from './equal';

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
}
