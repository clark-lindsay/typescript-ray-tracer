import { Matrix, identityGrid, identityMatrix } from './Matrix';
import { Tuple, point, vector } from './Tuple';

export function translationTransformation(x: number, y: number, z: number): Matrix {
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

export function xRotationTransformation(degreesInRadians: number): Matrix {
  const result = identityGrid(4);
  result[1][1] = Math.cos(degreesInRadians);
  result[1][2] = -Math.sin(degreesInRadians);
  result[2][1] = Math.sin(degreesInRadians);
  result[2][2] = Math.cos(degreesInRadians);
  return new Matrix(result);
}

export function yRotationTransformation(degreesInRadians: number): Matrix {
  const result = identityGrid(4);
  result[0][0] = Math.cos(degreesInRadians);
  result[0][2] = Math.sin(degreesInRadians);
  result[2][0] = -Math.sin(degreesInRadians);
  result[2][2] = Math.cos(degreesInRadians);
  return new Matrix(result);
}

export function zRotationTransformation(degreesInRadians: number): Matrix {
  const result = identityGrid(4);
  result[0][0] = Math.cos(degreesInRadians);
  result[0][1] = -Math.sin(degreesInRadians);
  result[1][0] = Math.sin(degreesInRadians);
  result[1][1] = Math.cos(degreesInRadians);
  return new Matrix(result);
}

export function shearTransformation(
  xInProportionToY: number,
  xInProportionToZ: number,
  yInProportionToX: number,
  yInProportionToZ: number,
  zInProportionToX: number,
  zInProportionToY: number
): Matrix {
  const result = identityGrid(4);
  result[0][1] = xInProportionToY;
  result[0][2] = xInProportionToZ;
  result[1][0] = yInProportionToX;
  result[1][2] = yInProportionToZ;
  result[2][0] = zInProportionToX;
  result[2][1] = zInProportionToY;
  return new Matrix(result);
}

export function viewTransformation(
  eyePosition: Tuple = point(0, 0, 0),
  eyeFocus: Tuple = point(0, 0, -1),
  upRelativeToEye: Tuple = vector(0, 1, 0)
): Matrix {
  return identityMatrix(4);
}
