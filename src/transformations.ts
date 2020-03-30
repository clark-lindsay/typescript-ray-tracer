import { Matrix, identityGrid } from './Matrix';

export function translation(x: number, y: number, z: number): Matrix {
  const result = identityGrid(4);
  result[0][3] = x;
  result[1][3] = y;
  result[2][3] = z;
  return new Matrix(result);
}

export function scalingTransformation(x: number, y: number, z: number): Matrix {
  const result = identityGrid(4);
  result[0][0] = x;
  result[1][1] = y;
  result[2][2] = z;
  return new Matrix(result);
}
