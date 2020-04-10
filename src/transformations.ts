import { Matrix, identityGrid } from './Matrix';
import { point, vector } from './Tuple';

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

export function shearTransformation({
  xInProportionToY = 0,
  xInProportionToZ = 0,
  yInProportionToX = 0,
  yInProportionToZ = 0,
  zInProportionToX = 0,
  zInProportionToY = 0
} = {}): Matrix {
  const result = identityGrid(4);
  result[0][1] = xInProportionToY;
  result[0][2] = xInProportionToZ;
  result[1][0] = yInProportionToX;
  result[1][2] = yInProportionToZ;
  result[2][0] = zInProportionToX;
  result[2][1] = zInProportionToY;
  return new Matrix(result);
}

export function viewTransformation({
  eyePosition = point(0, 0, 0),
  eyeFocus = point(0, 0, -1),
  upRelativeToEye = vector(0, 1, 0)
} = {}): Matrix {
  const forward = eyeFocus.subtract(eyePosition).normalize();
  const left = forward.crossProduct(upRelativeToEye.normalize());
  const trueUp = left.crossProduct(forward);

  const orientation = new Matrix([
    [left.x, left.y, left.z, 0],
    [trueUp.x, trueUp.y, trueUp.z, 0],
    [-forward.x, -forward.y, -forward.z, 0],
    [0, 0, 0, 1]
  ]);
  return orientation.cross(translationTransformation(-eyePosition.x, -eyePosition.y, -eyePosition.z));
}
