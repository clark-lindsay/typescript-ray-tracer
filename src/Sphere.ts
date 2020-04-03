import { Actor } from './interfaces';
import { Tuple, point } from './Tuple';
import { Color } from './Color';
import { Matrix, identityMatrix } from './Matrix';

export class Sphere implements Actor {
  center: Tuple;
  radius: number;
  color: Color;
  transform: Matrix = identityMatrix(4);

  constructor(center = point(0, 0, 0), radius = 1, color = new Color(1, 1, 1)) {
    [this.center, this.radius, this.color] = [center, radius, color];
  }

  normalAt(pointOnSphere: Tuple): Tuple {
    return pointOnSphere.subtract(point(0, 0, 0)).normalize();
  }
}
